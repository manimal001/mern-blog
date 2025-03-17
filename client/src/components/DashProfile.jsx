import { Alert, Button, Modal, TextInput } from 'flowbite-react';
import React, { useEffect, useRef, useState } from 'react';
import {useSelector} from 'react-redux';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { updateStart, updateSuccess, updateFailure, deleteUserStart, deleteUserSuccess, deleteUserFailure } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashProfile() {
    const { currentUser, error } = useSelector((state) => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [ imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
    const [ imageFileUploadError, setImageFileUploadError] = useState(null);
    const [formData, setFormData] = useState({});
    const [ imageFileUploading, setImageFileUploading] = useState(false);
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
    const [updateUserFailure, setUpdateUserFailure] = useState(null);
    const [showModel, setShowModel] = useState(false);
    const dispatch = useDispatch();
    const filePickerRef = useRef();

    const handleImageChange = (e) => {
       const file = e.target.files[0];
        if (file) {
          setImageFile(file);
          setImageFileUrl(URL.createObjectURL(file));
        }
    };
    useEffect(() => {
      if (imageFile) {
        uploadImage();
      }
    }, [imageFile]);

    const uploadImage = async () => {
      //service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**}{
    //     allow read;
    //     allow write: if
    //     request.resource.size < 2 * 1024 * 1024 &&
    //     request.resource.contentType.matches('image/.*')
    //   }
    //  }
       setImageFileUploading(true);
       setImageFileUploadError(null);
       const storage = getStorage(app);
       const fileName = new Date().getTime() + imageFile.name;
       const storageRef = ref(storage, fileName);
       const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on('state_changed', (snapshot) => {
           const progress = 
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageFileUploadProgress(progress.toFixed(0));
        },
         (error) => {
            setImageFileUploadError('Could not upload image (File must be less than 2MB)' 
              + error.message);    
            setImageFileUploadProgress(null);
            setImageFile(null);
            setImageFileUrl(null);
            setImageFileUploading(false);
         },
         () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageFileUrl(downloadURL);
              setFormData({...formData, profilePicture: downloadURL });
              setImageFileUploading(false);
            });
          }
        );
      }; 
      const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value });
      }
      const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) {
          setUpdateUserFailure('No changes were made');
          return;
        }
        if(imageFileUploading){
          setUpdateUserFailure('Please wait while the image is uploading');
          return;
        }
        try {
           dispatch(updateStart());
           const res = await fetch(`/api/user/update/${currentUser._id}`,{
             method: 'PUT',
             headers: {
               'Content-Type': 'application/json'
               },
             body: JSON.stringify(formData),
             });
             
             const data = await res.json();
             if (!res.ok) {
               dispatch(updateFailure(data.message));
               setUpdateUserFailure(data.message);
                
             }else{
              dispatch(updateSuccess(data));
              setUpdateUserSuccess("User's profile update successfully");
             }
        } catch (error) {
           dispatch(updateFailure(error.message));
           setUpdateUserFailure(error.message);
        }
      };

      const handleDeleteUser = async () => {
        setShowModel(false);
        try {
          dispatch(deleteUserStart());
           const res = await fetch(`/api/user/delete/${currentUser._id}`,{
             method: 'DELETE',
             });
               const data = await res.json();
             if (!res.ok) {
               dispatch(deleteUserFailure(data.message));
             }else{
              dispatch(deleteUserSuccess(data));
             }
             
          
        } catch (error) {
          dispatch(deleteUserFailure(error.message));
        }
      }; 
      
  return (
    <div className='w-full max-w-lg p-3 mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
         <input type='file' accept='image/*' onChange={handleImageChange} ref={filePickerRef} hidden/>
         <div className='relative self-center w-32 h-32 overflow-hidden rounded-full shadow-md cursor-pointer' onClick={() => filePickerRef.current.click()}
          >
            {imageFileUploadProgress && (
               <CircularProgressbar
                 value={imageFileUploadProgress || 0}
                 text={`${imageFileUploadProgress}%`}
                  strokeWidth={5}
                  styles={{ 
                    root: {
                      width: '100%',
                      height: '100%',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: 'rgba(62, 152, 199,  ${imageFileUploadProgress / 100})',
                    },
                   }}
                 
                 />
            )}
         <img src={imageFileUrl || currentUser.profilePicture} alt='user' className={`object-cover w-full h-full border-[lightgray] border-8 rounded-full ${imageFileUploadProgress && imageFileUploadProgress < 100 && 'opacity-60' }`}/>
         </div> 
          { imageFileUploadError &&  <Alert color='failure'>{imageFileUploadError} </Alert>}
          
          <TextInput type='text' id='username' placeholder='username' 
           defaultValue={currentUser.username} onChange={handleChange} />
           <TextInput type='text' id='email' placeholder='email' 
           defaultValue={currentUser.email} onChange={handleChange} />
           <TextInput type='password' id='password' placeholder='***************' onChange={handleChange} /> 
           <Button type='submit' gradientDuoTone='purpleToBlue' outline>
               Update
           </Button>
      </form>
       <div className='flex justify-between mt-5 text-red-500'>
           <span onClick={()=> setShowModel(true)} className='cursor-pointer'>Delete Account</span>
           <span className='cursor-pointer'>Sign Out</span>
       </div>
        { updateUserSuccess && (
          <Alert color='success'>{updateUserSuccess}</Alert>
        )}
        
        { updateUserFailure && (
          <Alert color='failure'>{updateUserFailure}</Alert>
        )}
         { error && (
          <Alert color='failure'>{error}</Alert>
        )}

        <Modal show={showModel} onClose={() => setShowModel(false)}
          popup
          size='md'
          >
          <Modal.Header/> 
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h=14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your account?</h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' 
                 onClick={handleDeleteUser}>
                  Yes, I'm sure
                </Button>
                <Button color='gray' 
                  onClick={() => setShowModel(false)}>
                  No,cancel
                </Button>
              </div>
            </div>
          </Modal.Body> 
        </Modal>
       
    </div>
  )
}
