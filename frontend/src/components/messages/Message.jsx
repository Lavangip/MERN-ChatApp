const Message = () =>{
    return(
        <div className= 'chat chat-end'>
            <div className='chat-image-avatar'>
                <div className='w-10 rounded-full'>
                </div>
            </div>
            <div className='chat-bubble text-white'
                style={{backgroundColor: '#BC8F8F'}}> HEYYY</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>11:11</div>
        </div>
    );
};

export default Message;