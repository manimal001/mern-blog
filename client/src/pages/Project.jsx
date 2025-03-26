import React from 'react';
import CallToAction from '../components/CallToAction';

export default function Project() {
  return (
    <div className='flex flex-col items-center justify-center max-w-2xl min-h-screen gap-6 p-3 mx-auto'>
       <h1 className='text-3xl font-semibold '> Projects</h1>
       <p>Build fun and engaging projects.</p>
       <CallToAction />
    </div>
  )
}
