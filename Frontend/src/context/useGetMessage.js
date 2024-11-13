import React, { useEffect, useState } from 'react'
import useConversation from '../components/zustand/useConversation.js'
import axios from 'axios'

const useGetMessage = () => {
    const [loading, setLoading] = useState(false);

    const {messages, setMessages, selectedConversation} = useConversation();

    useEffect(() => {
        const getMessages = async() =>{
            setLoading(true);
            if(selectedConversation && selectedConversation._id){
                try{
                    console.log("finding the data");
                    const res = await axios.get(`/api/message/get/${selectedConversation._id}`);
                    setMessages(res.data);
                    setLoading(false);
                    // console.log(messages);
                    // console.log(res.data);
                }
                catch(error){
                    console.log("Error in getting messages", error);
                    setLoading(false);
                }
            }
        }
        getMessages();
    }, [selectedConversation, setMessages])

  return {loading, messages}
}

export default useGetMessage
