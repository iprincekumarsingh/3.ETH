import React, { useEffect, useMemo, useState } from 'react';
import ChatList from '../../components/chat/ChatList';
import ChatScreen from '../chat/ChatScreen';

interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage?: string;
  timestamp?: string;
  unreadCount?: number;
}

export default function Home() {
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);

  useEffect(() => {
    document.title = 'Home | Chat';
  }, []);

  const chats = useMemo(() => [
    {
      id: '1',
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      lastMessage: 'Hello, how are you?',
      timestamp: '12:00 PM',
      unreadCount: 2
    },
    {
      id: '2',
      name: 'Alice Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice', 
      lastMessage: 'The meeting is scheduled for tomorrow',
      timestamp: '11:30 AM',
      unreadCount: 1
    },
    {
      id: '3',
      name: 'Bob Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      lastMessage: 'Thanks for your help!',
      timestamp: '10:15 AM',
      unreadCount: 0
    },
    {
      id: '4',
      name: 'Emma Davis',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      lastMessage: 'Can we discuss the project?',
      timestamp: '9:45 AM', 
      unreadCount: 3
    },
    {
      id: '5',
      name: 'Michael Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      lastMessage: 'The documents are ready',
      timestamp: '9:30 AM',
      unreadCount: 0
    },
    {
      id: '6',
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      lastMessage: 'Looking forward to our call',
      timestamp: '9:00 AM',
      unreadCount: 1
    },
    {
      id: '7',
      name: 'David Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      lastMessage: 'Please review the changes',
      timestamp: '8:45 AM',
      unreadCount: 0
    },
    {
      id: '8',
      name: 'Lisa Anderson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
      lastMessage: 'Great work on the presentation!',
      timestamp: '8:30 AM',
      unreadCount: 0
    },
    {
      id: '9',
      name: 'James Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
      lastMessage: 'When is the next meeting?',
      timestamp: '8:15 AM',
      unreadCount: 2
    },
    {
      id: '10',
      name: 'Emily Taylor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      lastMessage: "I've sent you the files",
      timestamp: '8:00 AM',
      unreadCount: 1
    }
  ], []);

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
  };

  return (
    <div className="flex w-full">
      <ChatList
        chats={chats}
        title="Chats"
        onChatSelect={handleChatSelect}
        selectedChatId={selectedChat?.id}
      />
      <ChatScreen selectedChat={selectedChat} />
    </div>
  );
}
