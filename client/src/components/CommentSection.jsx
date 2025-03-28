import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Button, Modal, Textarea } from 'flowbite-react';
import Comment from './Comment';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function CommentSection({postId}) {
    const  { currentUser} = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [ commentError, setCommentError] = useState(null);
    const [comments, setComments] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [commentToDelete, setCommentToDelete] = useState(null);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (comment.length > 200){
            return;
        }
      try {
                const res = await fetch('/api/comment/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content: comment, postId, userId: currentUser._id}),
            });
            const data = await res.json();
             console.log(data);
            if(res.ok){
                setComment('');
                setCommentError(null);
                setComments([data, ...comment]);
            }
            
        } catch (error) {
            setCommentError(error.message);
        }  
    };
  useEffect(() => {
    const getComments = async () => {
        try {
            const res = await fetch(`/api/comment/getPostComments/${postId}`);
            if(res.ok){
                const data = await res.json();
                setComments(data);
            }
            
        } catch (error) {
            console.log(error.message);
        }
    }
   getComments();
  }, [postId]);

  const handleLike =  async (commentId) => {
     try {
        if (!currentUser) {
            navigate('/sign-in');
            return;
        }
        const res = await fetch(`/api/comment/likeComment/${commentId}`,{
            method: 'PUT',
        });
        if (res.ok){
            const data = await res.json();
            setComments(
                comments.map((comment) => 
                comment._id === commentId 
                ? {
                    ...comment,
                    likes: data.likes,
                    numberOfLikes: data.likes.length,
                } : comment
            )
        );     
     }
             
     } catch (error) {
        console.log(error.message);
     }
  };

  const handleEdit = async (comment, editedContent) => {
    setComments(
        comments.map((c) =>
         c.id === comment._id ? { ...c, content: editedContent } : c
        )
    );
  };

  const handleDelete = async (commentId) => {
    setShowModal(false);
    try {
        if(!currentUser){
            navigate('/sign-in');
            return;
        }
        const res = await fetch(`/api/comment/deleteComment/${commentId}`,{
            method: 'DELETE',
        });
        if (res.ok){
            const data = await res.json();
            setComments(comments.filter((comment) => comment._id !== commentId));
            console.log(data);    
        } 
                   
     } catch (error) {
        console.log(error.message);
     }
  };
  
  return (
    <div className='w-full max-w-2xl p-3 mx-auto'>
        {currentUser ?
        (
          <div className='flex items-center gap-1 my-5 text-sm text-gray-500'>
            <p> Signed in as:</p>
            <img className='object-cover w-5 h-5 rounded-full' src={currentUser.profilePicture} alt=''/>
            <Link to={'/dashboard?tab=profile'} className='text-xs text-cyan-600 hover:underline'>
               @{currentUser.username}
            </Link>
          </div>
        ):
        (
            <div className='flex gap-1 my-5 text-sm text-teal-500'>
                You must be signed in to comment.
                <Link className='text-blue-500 hover:underline' to={'/sign-in'}>
                 Sign in
                </Link>
            </div>
        )}
         {currentUser && (
            <form onSubmit={handleSubmit} className='p-3 border border-teal-500 rounded-md'>
                <Textarea 
                 placeholder='Add a comment...'
                 rows='3'
                 maxLength='200'
                 onChange={(e) => setComment(e.target.value)}
                 value={comment}
                />
                <div className='flex items-center justify-between mt-5'>
                    <p className='text-xs text-gray-500'>{200 - comment.length} characters remaining</p>
                    <Button outline gradientDuoTone='purpleToBlue' type='submit'>
                        Submit
                    </Button>
                </div>
                { commentError && (
                     <Alert color='failure' className='mt-5'>
                     {commentError}
                 </Alert>
                )}  
            </form>         
         )}
         {comments.length === 0 ? (
            <p className='my-5 text-sm'>No comments yet!</p>
         ): (
           <>
            <div className="flex items-center gap-1 my-5 text-sm">
                <p>Comments</p>
                <div className='px-2 py-1 border-gray-400 rounded-sm'>
                   <p className='p-1 border border-gray-500 '> {comments.length} </p>
                </div>
            </div>
            {
                comments.map(comment => (
                    
                  <Comment 
                  key={comment._id} 
                  comment={comment}
                   onLike={handleLike} 
                   onEdit={handleEdit} 
                   onDelete={(commentId) => {
                    setShowModal(true)
                    setCommentToDelete(commentId)
                   }} 
                   />
                ))
            }
            
           </>
         )}
         
         <Modal show={showModal} onClose={() => setShowModal(false)}
                   popup
                   size='md'
                   >
                   <Modal.Header/> 
                   <Modal.Body>
                     <div className='text-center'>
                       <HiOutlineExclamationCircle className='h=14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                       <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want to delete your comment?</h3>
                       <div className='flex justify-center gap-4'>
                         <Button color='failure' 
                          onClick={() => handleDelete(commentToDelete)}>
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
