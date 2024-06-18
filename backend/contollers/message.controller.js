import Conversation from "../models/conversation.models.js";
import Message from "../models/message.models.js";
import { getReceiverSocketId, io } from "../socket/socket.js";


export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params; 
        const senderId = req.user._id; 

        if (!senderId || !receiverId || !message) {
            return res.status(400).json({ error: 'senderId, receiverId, and message are required' });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId, receiverId]
            });
        }
        const newMessage = new Message({
            senderId,
            receiverId,
            message
        });

        conversation.messages.push(newMessage._id);


        await Promise.all([conversation.save(), newMessage.save()]);

        //SOCKET IO
        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sending message controller", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};



export const getMessages = async (req,res) => {
    try{
        const {id: userToChat} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants: {$all: [senderId, userToChat]}
        }).populate('messages');

        if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);


    }catch(error){
        console.log("Error in get message controller",error.message);
        res.status(500).json({error:"Internal server error"});
    }
}
