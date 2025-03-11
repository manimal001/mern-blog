import React from 'react'
import { Button, Navbar, NavbarCollapse, NavbarToggle, TextInput} from 'flowbite-react';
import { Link,useLocation } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { FaMoon } from 'react-icons/fa';

export default function Header() {
      const path = useLocation().pathname;
  return (
     <Navbar className='border-b-2'>
         <Link to="/" className='self-center text-sm font-semibold whitespace-nowrap sm:text-xl dark:text-white'>
          <span className='px-2 py-1 text-white rounded bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500-lg'>
            Rajeeb's
            </span>
            Blog
         </Link> 
         <form>
            <TextInput 
                type='text'
                placeholder='Search...'
                rightIcon={AiOutlineSearch}
                className='hidden lg:inline'/>
        </form>    
        <div className='flex gap-2 md:order-2'>  
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
              <AiOutlineSearch/>     
          </Button>
          <Button className='hidden w-12 h-10 gap-2 sm:inline' color='gray' pill>
           <FaMoon />
          </Button>
          <Link to='/sign-in'>
             <Button gradientDuoTone='purpleToBlue' outline>
                Sign In
             </Button>
          </Link>
          <NavbarToggle />
        </div>
          <NavbarCollapse>
               <Navbar.Link active={path === "/"} as={'div'}>
               <Link to='/'>
                     Home
                     </Link>
               </Navbar.Link>
               
               <Navbar.Link active={path === "/about"} as={'div'}>
               <Link to='/about'>
                     About
                     </Link>
               </Navbar.Link>
               
               <Navbar.Link active={path === "/project"} as={'div'}>
               <Link to='/project'>
                     Project
                     </Link>
               </Navbar.Link>  
          </NavbarCollapse>
     </Navbar>
  );
}
