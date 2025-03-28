import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage , setErrorMessage] = useState(null);
  const [Loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
   const handleChange = (e) => {
     setFormData({...formData, [e.target.id]: e.target.value.trim() });
   }
   const handleSubmit = async (e) => {
     e.preventDefault();
     if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('All fields are required'); 
     }
     try {
      setLoading(true);
      setErrorMessage(null);
       const res = await fetch('/api/auth/signup', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(formData),
       });
       const data = await res.json();
       if (data.success === false) {
         return setErrorMessage(data.message);
       }
       setLoading(false);
       if (res.ok){
        navigate('/');
       }
     } catch (error) {
       setErrorMessage(error.message);
       setLoading(false);
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
          This is demo project. You can sign up with your email and password or with Google.
         </p>
       </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
            <Label value='Your Username'/>
            <TextInput type='text' placeholder='Username' id='username' onChange={handleChange}/>   
          </div>
          <div>
            <Label value='Your Email'/>
            <TextInput type='email' placeholder='name@company.com' id='email' onChange={handleChange}/>   
          </div>
          <div>
            <Label value='Your Password'/>
            <TextInput type='password' placeholder='Password' id='password' onChange={handleChange}/>   
          </div>
          <Button type='submit' gradientDuoTone='purpleToPink' disabled={Loading}>
            {
              Loading ? (
                <>
                  <Spinner size='sm'/>
                  <span className='pl-3'>Loading...</span>
                </>
              ) : (
                'Sign Up'
              )}     
          </Button>
          <OAuth />
          </form>
          <div className='flex gap-2 mt-5 text-sm'>
            <span>
              Already have an account?  </span>
              <Link to='/sign-in' className='text-blue-500'>
              Sign In
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
