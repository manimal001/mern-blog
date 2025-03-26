import React from 'react'

export default function About() {
  return (
    <div className='flex items-center justify-center min-h-screen'>
       <div>
        <div className='max-w-2xl p-3 mx-auto text-center'>
            <h1 className='text-3xl font-semibold font py-7'>Rajeeb's Blog</h1>
           <div className='flex flex-col gap-6 text-gray-500 text-md'>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
              <p>
                 It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
              </p>
              <p>
                 Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.  Richard McClure, a professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, "consectetuer," from an old 16th-century book, The Adventures of Huckleberry Finn, and is remembered today for its role in literature.
              </p>
          </div>
        </div>
       </div>
    </div>
  )
}
