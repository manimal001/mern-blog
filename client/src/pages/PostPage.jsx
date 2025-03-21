import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Spinner } from 'flowbite-react'; 
import CallToAction from '../components/CallToAction';
import CommentSection from '../components/CommentSection';

export default function PostPage() {
    const { postSlug } = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(false);
    const [ post, setPost ] = useState(null);

    useEffect(() => {
       const fetchPost = async () => {
        try {
           setLoading(true);
           const res = await fetch(`/api/post/getposts?slug=${postSlug}`);
           const data = await res.json();
           if(!res.ok) {
            setError(true);
            setLoading(false);
            return;
           }
           if (res.ok) {
             setLoading(false);
             setPost(data.posts[0]);
             setError(false);
           } 
        } catch (error) {
            setError(true);
            setLoading(false);
            console.log(error);
        }   
       }
       fetchPost();
    }, [postSlug]);
    
    if (loading) return (
        <div className='flex items-center justify-center min-h-screen'>
         <Spinner size='xl' />
        </div>
    );
  return (
    <main className='flex flex-col max-w-6xl min-h-screen p-3 mx-auto'>
       <h1 className='max-w-2xl p-3 mx-auto mt-10 font-serif text-3xl text-center lg:text-4xl'>{post && post.title}</h1>
        <Link to={`/search?category=${post && post.category}`} className='self-center mt-5'>
         <Button color='gray' pill size='xs'>{post && post.category} </Button>
        </Link>
         <img src= {post && post.image} alt={post && post.title} className='p-3 mt-10 max-h-[600px] w-full object-cover' />
        <div className='flex justify-between w-full max-w-2xl p-3 mx-auto text-xs border-b border-slate-500'>
            <span>{post && new Date(post.createdAt).toLocaleDateString()} </span>
             <span className='italic'>{post && (post.content.length /1000).toFixed(0)} mins read </span>
        </div>
         <div className='w-full max-w-2xl p-3 mx-auto post-content' dangerouslySetInnerHTML={{__html: post && post.content}}>
         </div>
         <div className='w-full max-w-4xl mx-auto'>
          <CallToAction />
         </div>
         <CommentSection postId={post._id}/>
    </main>
  )
};
