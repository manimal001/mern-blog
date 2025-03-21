import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Alert, Button, Textarea } from 'flowbite-react';

export default function CommentSection({postId}) {
    const  { currentUser} = useSelector(state => state.user);
    const [comment, setComment] = useState('');
    const [ commentError, setCommentError] = useState(null);
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
            }
            
        } catch (error) {
            setCommentError(error.message);
        }  
    }
 
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
    </div>
  )
}
