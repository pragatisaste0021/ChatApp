import React from 'react'
import Search from './Search';
import Users from './Users';
import Logout from './Logout';

const Left = () => {
  return (
    <div className='w-full bg-black text-gray-300'>
      <Search/>
      <Users className = "flex-1 overflow-y-auto" style={{minHeight: "calc(84vh - 10vh)"}}/>
      <Logout/>
    </div>
  );
}

export default Left
