import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Project from './pages/Project';
import Header from './components/Header';



export default function App() {
  return (
    <BrowserRouter>
     <Header />
     <Routes>
         <Route>
         <Route path='/' element={<Home />}/>
         <Route path='/about' element={<About/>}/>
         <Route path='/dashboard' element={<Dashboard />}/>
         <Route path='/sign-in' element={<SignIn />}/>
         <Route path='/sign-up' element={<SignUp />}/>
         <Route path='/project' element={<Project />}/>
         </Route>     
     </Routes>   
    </BrowserRouter>
  )
}
