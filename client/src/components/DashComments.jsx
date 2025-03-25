import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import { Modal, Button, Table, TableHead } from 'flowbite-react';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

export default function DashComments() {
   const { currentUser } = useSelector((state) => state.user);
   const [ comments, setComments] = useState([]);
   const [showMore, setShowMore] = useState(true);
   const [showModal, setShowModal] = useState(false);
   const [commentIdToDelete, setCommentIdToDelete] = useState('');
  //  console.log(userPosts);
   useEffect(() => {
      const fetchComments = async () => {
        try {
          const res = await fetch(`/api/comment/getcomments`);
          const data = await res.json();
          if(res.ok){
            setComments(data.comments);
            if(data.comments.length < 9 ){
              setShowMore(false);
            }
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      if(currentUser.isAdmin){
        fetchComments();
      }
    
   }, [currentUser._id]);
   
   const handleShowMore = async () => {
     const startIndex = comments.length;
     try {
       const res = await fetch(`/api/comment/getcomments?startIndex=${startIndex}`);
       const data = await res.json();
       if (res.ok){
        setComments((prev) => [...prev, ...data.comments]);
        if(data.comments.length < 9 ){
          setShowMore(false);
        }
       }
       
     } catch (error) {
       console.log(error.message);
     }
   };
   
    const handleDeleteComment = async () => {
      try {
        const res = await fetch(`/api/comment/delete/${commentIdToDelete}`,{
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${currentUser.token}`, // Add token here
            'Content-Type': 'application/json',
          },
        });
        const data = await res.json();
        if (!res.ok){
          setComments((prev) => prev.filter((comment) => comment._id !== commentIdToDelete));
          setShowModal(false);
        }else{
          console.log(data.message);
        }
      } catch (error) {
         console.log(error.message);
      }
    }
   

  return (
    <div className='p-3 overflow-x-scroll table-auto md:mx-auto scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin &&  comments.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell> Date Updated</Table.HeadCell>
                <Table.HeadCell> Comment content </Table.HeadCell>
                <Table.HeadCell>Number of Likes</Table.HeadCell>
                <Table.HeadCell> Postid</Table.HeadCell>
                <Table.HeadCell> UserId</Table.HeadCell>
                <Table.HeadCell> Delete</Table.HeadCell>
              </Table.Head>
              {comments.map((comment) => (
              <Table.Body className='divide-y' key={comment._id}>
                <Table.Row className='bg-white dark:hover-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{new Date(comment.updatedAt).toLocaleDateString()}</Table.Cell>
                  <Table.Cell>
                   
                      {comment.content}
                   
                  </Table.Cell>
                  <Table.Cell>
                  
                    {comment.numberOfLikes}
                 
                    </Table.Cell>
                  <Table.Cell>{comment.postId}</Table.Cell>
                  <Table.Cell>
                    {comment.userId}
                  </Table.Cell>
                  <Table.Cell>
                    <span onClick={() => {
                      setShowModal(true);
                      setCommentIdToDelete(comment._id);
                    }}
                    className='font-medium text-red-500 cursor-pointer hover:underline'>
                     Delete
                    </span>
                  </Table.Cell>
                  
                </Table.Row>
              </Table.Body>
            ))}         
          </Table>
          {
            showMore && (
              <button onClick={handleShowMore} className='self-center w-full text-sm text-teal-500 py-7'>
                Show More
              </button>
            )
          }

        </>
      ):(
        <p>You have no comments yet!</p>
      )}
      
      <Modal show={showModal} onClose={() => setShowModal(false)}
          popup
          size='md'
          >
          <Modal.Header/> 
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='h=14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
              <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your user?</h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' 
                 onClick={handleDeleteComment}>
                  Yes, I'm sure
                </Button>
                <Button color='gray' 
                  onClick={() => setShowModal(false)}>
                  No,cancel
                </Button>
              </div>
            </div>
          </Modal.Body> 
        </Modal>
    </div>
  )
};
