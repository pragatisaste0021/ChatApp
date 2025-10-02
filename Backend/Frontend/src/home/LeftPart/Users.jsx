import React from 'react'
import User from './User'
import UseGetAllUsers from '../../context/UseGetAllUsers'

const Users = () => {

  const [allUsers, loading] = UseGetAllUsers();

  console.log(allUsers);

  console.log(Array.isArray(allUsers));
  console.log(typeof(allUsers));

  return (
    <div style={{width: "500px"}} className='bg-gray-800'>
      <h1 className='px-8 py-2 text-white font-semibold bg-gray-800 rounded'>Messages</h1>

      <div className='py-2 flex-1 overflow-y-auto' style={{maxHeight: "calc(84vh - 10vh)"}}>
      
      {allUsers.map((user, index) => (
        <User key={index} user={user}/>
      ))}
      </div>
    </div>
  )
}

export default Users
