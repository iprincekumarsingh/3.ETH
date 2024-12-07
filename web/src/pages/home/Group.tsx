import React, { useEffect, useMemo, useState } from 'react';
import ChatList from '../../components/chat/ChatList';
import ChatScreen from '../chat/ChatScreen';

export default function Home() {
    const [selectedChat, setSelectedChat] = useState<any>(null);

    useEffect(() => {
        document.title = 'Home | Chat';
    }, []);

    const chats = useMemo(() => [
        {
            id: '1',
            name: 'Smart Contract Developers',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev1',
            lastMessage: 'Anyone working on Solidity upgrades?',
            timestamp: '2:30 PM',
            unreadCount: 5
        },
        {
            id: '2',
            name: 'Metaverse Builders',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aditi',
            lastMessage: 'Virtual land sale starting tomorrow',
            timestamp: '9:15 AM',
            unreadCount: 0
        }
    ], []);

    const handleChatSelect = (chat: any) => {
        setSelectedChat(chat);
    };

    return (
        <div className="flex w-full">
            <ChatList
                chats={chats}
                title="Groups"
                onChatSelect={handleChatSelect}
                selectedChatId={selectedChat?.id}
            />
            <ChatScreen
                selectedChat={selectedChat}
                emptyStateTitle="Select a group to start messaging"
            />
        </div>
    );
}
