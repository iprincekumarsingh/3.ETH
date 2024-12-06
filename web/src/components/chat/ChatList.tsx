import React from 'react';

interface ChatListItemProps {
  title?: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
}

const ChatListItem: React.FC<ChatListItemProps> = ({
  title,
  name,
  avatar,
  lastMessage,
  timestamp,

}) => {
  return (
    <div className="flex items-center p-3 hover:bg-gray-800/50 rounded-lg cursor-pointer transition-colors duration-200">
      <div className="relative flex-shrink-0">
        <img 
          src={avatar} 
          alt={`${name}'s avatar`}
          className="w-10 h-10 rounded-full object-cover"
        />
      </div>
      
      <div className="ml-3 flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-medium truncate max-w-[70%]">{title || name}</h3>
          {timestamp && (
            <span className="text-gray-400 text-xs ml-2 flex-shrink-0">{timestamp}</span>
          )}
        </div>
        {lastMessage && (
          <p className="text-gray-400 text-sm truncate">{lastMessage}</p>
        )}
      </div>
    </div>
  );
};

interface ChatListProps {
  chats: ChatListItemProps[];
  title?: string;
  titleClassName?: string;
}

function ChatList({ chats, title = "Chats", titleClassName = "text-xl font-bold text-white" }: ChatListProps) {
  return (
    <aside className="w-80 h-screen border-r border-gray-800/50 bg-black/90 backdrop-blur-xl overflow-y-auto">
      <div className="p-3 border-b border-gray-800/50">
        <h2 className={`${titleClassName} truncate`}>{title}</h2>
      </div>
      <div className="space-y-1 p-2">
        {chats.map((chat, index) => (
          <ChatListItem key={index} {...chat} />
        ))}
      </div>
    </aside>
  );
}

export default ChatList;