import Conversation from '../models/conversation.model.js'
import Message from '../models/message.model.js';
import { getReceiverSocketId } from '../SocketIO/server.js';
import { io } from '../SocketIO/server.js';

export const sendMessage=async(req, res) => {
    // console.log("Message Sent", req.params.id, req.body);
    try{
        const {message} = req.body;
        const {id: receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            members: {$all:[senderId, receiverId]}
        })
        
        if(!conversation){
            conversation = await Conversation.create({
                members: [senderId, receiverId],
            })
        }

        const newMessage = new Message({
            senderId, receiverId, message
        })

        console.log(newMessage._id);

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        // await conversation.save();
        // await newMessage.save();

        await Promise.all([conversation.save(), newMessage.save()]);    //run parallely

        const receiverSocketId = getReceiverSocketId(receiverId);

        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(201).json(
            // message: "Message Sent Successfully",
            newMessage
        )
    }
    catch(error){
        console.log("Error In Send Message", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}

// Get all messages

export const getMessage = async(req, res) => {
    try{
        const {id: chatUser} = req.params;
        const senderId = req.user._id;                 //Current Logged In User
        let conversation = await Conversation.findOne({
            members: {$all: [senderId, chatUser]},
        }).populate("messages");

        if(!conversation){
            return res.status(201).json([]);
        }

        const messages = conversation.messages;
        return res.status(201).json(messages);
    }
    catch(error){
        console.log("Error In Get Message", error);
        return res.status(500).json({error: "Internal Server Error"});
    }
}
