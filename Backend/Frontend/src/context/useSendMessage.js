import React, { useEffect, useState } from 'react'
import useConversation from '../components/zustand/useConversation.js'
import axios from 'axios'

const useSendMessage = () => {

    const [loading, setLoading] = useState(false);

    const {messages, setMessages, selectedConversation} = useConversation();


    const sendMessage = async(message) =>{
        setLoading(true);
        try{
            console.log("finding the data");
            const res = await axios.post(`/api/message/send/${selectedConversation._id}`, {message});
            console.log(res.data);
            setMessages([...messages, res.data]);
            setLoading(false);
            // console.log(messages);
            console.log(res.data);
        }
        catch(error){
            console.log("Error in sending messages", error);
            setLoading(false);
        }
    }


  return {loading, sendMessage}
}

export default useSendMessage
