import React, { useState } from 'react'
import { IoMdSend } from "react-icons/io";
import useSendMessage from '../../context/useSendMessage.js';

const Typesend = () => {

  const [message, setMessage] = useState("");
  const {loading, sendMessage} = useSendMessage();

  const handleSubmit = async(e) => {
    console.log(e.target.value);
    e.preventDefault();
    await sendMessage(message);
    setMessage("");
  }

  return (
    
    <form onSubmit={handleSubmit}>

      <div className='flex space-x-1 h-[8vh] bg-gray-800'>

      <div className='w-[70%] mx-4'>
        <input type="text" placeholder="Type here" className="border border-gray-700 w-full bg-gray-900 outline-none px-4 py-3 rounded-xl mt-1" value={message} onChange={(e) => setMessage(e.target.value)}/>
      </div>
      <button className='text-3xl'><IoMdSend /></button>

      </div>
    </form>
  )
}

export default Typesend
