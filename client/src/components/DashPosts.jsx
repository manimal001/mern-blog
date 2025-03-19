import React, { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import { Table, TableHead } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function DashPosts() {
   const { currentUser } = useSelector((state) => state.user);
   const [ userPosts, setUserPosts] = useState([]);
  //  console.log(userPosts);
   useEffect(() => {
     // Fetch posts from the server
      const fetchPosts = async () => {
        try {
          const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);
          const data = await res.json();
          if(res.ok){
            setUserPosts(data.posts)
          }
        } catch (error) {
          console.log(error.message);
        }
      };
      if(currentUser.isAdmin){
        fetchPosts();
      }
    
   }, [currentUser._id]);
  return (
    <div>
      {currentUser.isAdmin && userPosts.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
              <Table.Head>
                <Table.HeadCell> Date Updated</Table.HeadCell>
                <Table.HeadCell> Post Image</Table.HeadCell>
                <Table.HeadCell> Post Title</Table.HeadCell>
                <Table.HeadCell> Category</Table.HeadCell>
                <Table.HeadCell> Delete</Table.HeadCell>
                <Table.HeadCell> 
                  <span>Edit</span>
                </Table.HeadCell>
              </Table.Head>
             {userPosts.map((post) => {
               <Table.Body>
                 <Table.Row>
                 <Table.Cell>{new Date(post.updatedAt).toLocaleDateString()} </Table.Cell>
                  <Table.Cell>
                    <Link to={`/post/${post.slug}`}>
                   <img src={post.image} alt={post.title} className='object-cover w-20 h-10 bg-gray-500' />
                   </Link>
                   </Table.Cell>  
                 </Table.Row>          
               </Table.Body>
             })}
              
          </Table>

        </>
      ):(
        <p>You have no posts yet!</p>
      )}
    </div>
  )
};
