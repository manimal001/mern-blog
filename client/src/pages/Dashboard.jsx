import React, { useState } from 'react';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';

export default function Dashboard() {
  const location = useLocation();
  const [ tab, setTab ] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
     if (tabFromUrl) {
       setTab(tabFromUrl);
     }
  }, [location.search]);
  return (
    <div className='flex flex-col min-h-screen md:flex-row'>
    <div className='md:w-56'>
       {/* Sidebar */}
      <DashSidebar />
    </div>
       {/* Profile */}
     { tab === 'profile' && <DashProfile />}
      {/* posts */}
     { tab === 'posts' &&  <DashPosts />}
       {/* Users */}
       { tab === 'users' &&  <DashUsers />}
       {/* Comments */}
       { tab === 'comments' &&  <DashComments />}
        {/* Dashboardcomp */}
        { tab === 'dash' &&  <DashboardComp />}
    </div>
    );
}
