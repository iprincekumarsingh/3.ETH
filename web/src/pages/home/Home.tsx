import React, { useEffect, useMemo } from 'react';
import ChatList from '../../components/chat/ChatList';
import ChatScreen from '../chat/ChatScreen';

export default function Home() {
  useEffect(() => {
    document.title = 'Home | Chat';
  }, []);

  const chats = useMemo(() => [
    {
      name: 'John Doe',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
      lastMessage: 'Hello, how are you?',
      timestamp: '12:00 PM',
      unreadCount: 2
    },
    {
      name: 'Alice Smith',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice', 
      lastMessage: 'The meeting is scheduled for tomorrow',
      timestamp: '11:30 AM',
      unreadCount: 1
    },
    {
      name: 'Bob Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bob',
      lastMessage: 'Thanks for your help!',
      timestamp: '10:15 AM',
      unreadCount: 0
    },
    {
      name: 'Emma Davis',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emma',
      lastMessage: 'Can we discuss the project?',
      timestamp: '9:45 AM', 
      unreadCount: 3
    },
    {
      name: 'Michael Brown',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=michael',
      lastMessage: 'The documents are ready',
      timestamp: '9:30 AM',
      unreadCount: 0
    },
    {
      name: 'Sarah Johnson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
      lastMessage: 'Looking forward to our call',
      timestamp: '9:00 AM',
      unreadCount: 1
    },
    {
      name: 'David Lee',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=david',
      lastMessage: 'Please review the changes',
      timestamp: '8:45 AM',
      unreadCount: 0
    },
    {
      name: 'Lisa Anderson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
      lastMessage: 'Great work on the presentation!',
      timestamp: '8:30 AM',
      unreadCount: 0
    },
    {
      name: 'James Wilson',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=james',
      lastMessage: 'When is the next meeting?',
      timestamp: '8:15 AM',
      unreadCount: 2
    },
    {
      name: 'Emily Taylor',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=emily',
      lastMessage: "I've sent you the files",
      timestamp: '8:00 AM',
      unreadCount: 1
    }
  ], []);

  return (
    <div className="flex w-full">
      <ChatList
        chats={chats}
        title="Chats"
      />
      <ChatScreen />
    </div>
  );
}
