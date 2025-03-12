import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
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
          This is demo project. You can sign up with your email and password or with Google.
         </p>
       </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4'>
              <div>
            <Label value='Your Username'/>
            <TextInput type='text' placeholder='Username' id='username'/>   
          </div>
          <div>
            <Label value='Your Email'/>
            <TextInput type='text' placeholder='name@company.com' id='email'/>   
          </div>
          <div>
            <Label value='Your Password'/>
            <TextInput type='text' placeholder='Password' id='password'/>   
          </div>
          <Button type='submit' gradientDuoTone='purpleToPink'>
             Sign up
          </Button>
          </form>
          <div className='flex gap-2 mt-5 text-sm'>
            <span>
              Already have an account? 
              <Link to='/signin' className='text-blue-500'>
              Sign In
              </Link>  
            </span>
          </div>
        </div>
       </div>
    </div>
  )
}
