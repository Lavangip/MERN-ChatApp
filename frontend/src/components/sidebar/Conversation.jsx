import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/socketContext";

const Conversation = ({conversation,lastIdx,emoji}) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const isSelected = selectedConversation?._id === conversation._id;

	const { onlineUsers } = useSocketContext();
	const isOnline = onlineUsers.includes(conversation._id);

	return (
		<>
			<div
				className={`flex gap-2 items-center p-2 py-1 cursor-pointer
					${isSelected ? "custom-bg-color" : ""}
				`}
				style={{ transition: 'background-color 0.3s' }}
				onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#BC8F8F')}
				onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '')}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className={`avatar ${isOnline ? "online" : ""}`}>
					<div className='w-12 rounded-full'>
						<img
							src={conversation.profilepicture}
							alt='user avatar'
						/>
					</div>
				</div>

				<div className='flex flex-col flex-1'>
					<div className='flex gap-3 justify-between'>
						<p className='font-bold text-gray-100'>{conversation.fullname}</p>
						<span className='text-xl'>{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className='divider my-0 py-0 h-1' />}
		</>
	);
};
export default Conversation;
