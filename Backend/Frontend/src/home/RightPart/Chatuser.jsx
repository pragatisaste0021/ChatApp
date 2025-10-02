import React from 'react'
import useConversation from '../../components/zustand/useConversation.js'
import { useSocketContext } from '../../context/SocketContext.jsx';
import { CiMenuFries } from 'react-icons/ci';

const Chatuser = () => {

  const {selectedConversation} = useConversation();

  const {onlineUsers} = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    console.log(userId);
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  }

  console.log("Online Users " + onlineUsers);

  console.log(selectedConversation.fullname + " " + selectedConversation._id);

  return (

    <div className='relative'>

    <label htmlFor="my-drawer-2" className="btn btn-ghost drawer-button lg:hidden absolute left-5">
    <CiMenuFries className='text-white text-xl'/>
    </label>

    <div className='flex space-x-3 justify-center items-center bg-gray-800 hover:bg-gray-700 duration-300 h-[8vh]'>
      
      <div className="avatar online">
        <div className="w-16 rounded-full">
            <img src="https://img.icons8.com/?size=100&id=tZuAOUGm9AuS&format=png&color=000000" />
        </div>
      </div>

      <div>
        <h1 className='text-lg'>{selectedConversation.fullname}</h1>
        <span className='text-sm'>{getOnlineUsersStatus(selectedConversation._id)}</span>
      </div>

    </div>

    </div>
  )
}

export default Chatuser
