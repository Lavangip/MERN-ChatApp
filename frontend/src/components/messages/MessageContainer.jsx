import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageContainer = () => {
	const noChatselected = false;

	return (
		<div className='w-3/4 h-full flex flex-col md:min-w-[450px] bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
			{noChatselected ? (
				<NoChatSelected />
			) : (
				<>
					{/* Header */}
					<div className='bg-white px-4 py-2 mb-2'>
						<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>John Doe</span>
					</div>
					<Messages />
					<MessageInput />
				</>
			)}
		</div>
	);
};

export default MessageContainer;

const NoChatSelected = () => {
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋 CDef</p>
				<p>Select a chat to start messaging</p>
			</div>
		</div>
	);
};
