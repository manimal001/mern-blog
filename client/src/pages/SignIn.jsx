import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from'react-redux';
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { Loading, error: errorMessage} = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
   const handleChange = (e) => {
     setFormData({...formData, [e.target.id]: e.target.value.trim() });
   }
   const handleSubmit = async (e) => {
     e.preventDefault();
     if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
     }
     try {
      dispatch(signInStart());
       const res = await fetch('/api/auth/signin', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData),
       });
       const data = await res.json();
       if (data.success === false) {
         dispatch(signInFailure(data.message));
       }
      
       if (res.ok){
        dispatch(signInSuccess(data));
        navigate('/');
       }
     } catch (error) {
       dispatch(signInFailure(error.message));
     }
   };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex flex-col max-w-3xl gap-5 p-3 mx-auto md:flex-row md:items-center'>
       {/* left */}
       <div className='flex-1'>
       <Link to="/" className='text-4xl font-bold dark:text-white'>
          <span className='px-2 py-1 text-white rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500-lg'>
            Rajeeb's
            </span>
            Blog
         </Link>
         <p className='mt-5 text-sm'>
          This is demo project. You can sign In with your email and password or with Google.
         </p>
       </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>     
          <div>
            <Label value='Your Email'/>
            <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}/>   
          </div>
          <div>
            <Label value='Your Password'/>
            <TextInput type='password' placeholder='**********' id='password' onChange={handleChange}/>   
          </div>
          <Button type='submit' gradientDuoTone='purpleToPink' disabled={Loading}>
            {
              Loading ? (
                <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign In'
              )}
            
          </Button>
          <OAuth />
          </form>
          <div className='flex gap-2 mt-5 text-sm'>
            <span>
             Don't have an account?  </span>
              <Link to='/sign-up' className='text-blue-500'>
               Sign Up
              </Link>     
          </div>
           {
            errorMessage && (
              <Alert className='mt-5' color='failure'>
                {errorMessage}
              </Alert>
            )
           }
        </div>
       </div>
    </div>
  )
}
