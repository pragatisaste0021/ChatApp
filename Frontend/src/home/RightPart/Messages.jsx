import React, { useEffect } from 'react'
import Message from './Message'
import useGetMessage from '../../context/useGetMessage.js'
import Loading from '../../components/Loading.jsx'
import { useRef } from 'react'
import useGetSocketMessage from '../../context/useGetSocketMessage.js'

const Messages = () => {

  const {loading, messages} = useGetMessage();

  useGetSocketMessage();     //listen incoming messages

  const lastMsgRef = useRef();
  useEffect(() => {
    setTimeout(() => {
      if(lastMsgRef.current){
        lastMsgRef.current.scrollIntoView({behavior: "smooth"});
      }
    }, 100);
  }, [messages])

  return (
    <div className='flex-1 overflow-y-auto' style={{minHeight: "calc(92vh - 8vh)"}}>

      {/* Loading displaying Else Messages */}

      {loading ? (<Loading/>) : (messages.length > 0 && messages.map((message) => (
        <div key={message._id} ref={lastMsgRef}>
          <Message message={message}/>
        </div>
      )))}
      
      {/* Displaying messages from the database */}
      
      {!loading && messages.length === 0 && (
        <div>
          <p className='text-center mt-[20%]'>Say! Hii to start the conversation</p>
        </div>
      )}
    </div>
  )
}

export default Messages
