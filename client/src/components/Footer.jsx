import React from 'react';
import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitterX, BsGithub} from 'react-icons/bs';

export default function FooterCom() {
  return (
    <Footer container className='border border-t-8 border-teal-500'>
        <div className='w-full mx-auto max-w-7xl'>
            <div className='grid justify-between w-full sm:flex md:grid-cols-1'>
                <div className='mt-5'>
                    <Link to="/" className='self-center text-lg font-semibold whitespace-nowrap sm:text-xl dark:text-white'>
                    <span className='px-2 py-1 text-white rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500-lg'>
                    Rajeeb's
                    </span>
                    Blog
                    </Link> 
                </div>
                <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
                     <div>
                     <Footer.Title title='About' />
                     <Footer.LinkGroup col>
                        <Footer.Link
                         href='http://www.google.com/search'
                         target='_blank'
                         rel='noopener noreferrer'
                        >
                            React js project
                        </Footer.Link>
                        <Footer.Link
                         href='/about'
                         target='_blank'
                         rel='noopener noreferrer'
                        >
                           Rajeeb's Blog
                        </Footer.Link>
                     </Footer.LinkGroup>
                     </div>
                     <div>
                     <Footer.Title title='Follow Us' />
                     <Footer.LinkGroup col>
                        <Footer.Link
                         href='http://www.github.com/react'
                         target='_blank'
                         rel='noopener noreferrer'
                        >
                            GithHub
                        </Footer.Link>
                        <Footer.Link
                         href='/about'
                         target='_blank'
                         rel='noopener noreferrer'
                        >
                           Rajeeb's Blog
                        </Footer.Link>
                     </Footer.LinkGroup>
                     </div>
                     <div>
                     <Footer.Title title='Legal' />
                     <Footer.LinkGroup col>
                        <Footer.Link
                         href='#'
                        >
                          Privacy Policy
                        </Footer.Link>
                        <Footer.Link
                         href='#'
                    
                        >
                          Terms &amp; Conditions
                        </Footer.Link>
                     </Footer.LinkGroup>
                     </div>
                </div>
            </div>
            <Footer.Divider />
             <div className='w-full sm:flex sm:items-center sm:justify-between'>
                 <Footer.Copyright 
                  href='#'
                  by="Rajeeb's Blog"
                  year={new Date().getFullYear()}
                 />
                 <div className='flex gap-6 mt-6 sm:mt-0 sm:justify-center'>
                     <Footer.Icon href='#' icon={BsFacebook}/>
                     <Footer.Icon href='#' icon={BsTwitterX}/>
                     <Footer.Icon href='#' icon={BsGithub}/>
                     <Footer.Icon href='#' icon={BsInstagram}/>
                 </div>
             </div>
        </div>
    </Footer>
  );
}
