import React, { useEffect, useMemo } from 'react';
import ChatList from '../../components/chat/ChatList';

export default function Home() {
    useEffect(() => {
        document.title = 'Home | Chat';
    }, []);

    const chats = useMemo(() => [
        {
            name: 'Smart Contract Developers',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=dev1',
            lastMessage: 'Anyone working on Solidity upgrades?',
            timestamp: '2:30 PM',
            unreadCount: 5
        },
        {
            name: 'Metaverse Builders',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=aditi',
            lastMessage: 'Virtual land sale starting tomorrow',
            timestamp: '9:15 AM',
            unreadCount: 0
        }, {
            name: 'Metaverse Builders',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=meta',
            lastMessage: 'Virtual land sale starting tomorrow',
            timestamp: '9:15 AM',
            unreadCount: 0
        }

    ], []);

    return (
        <div className="flex w-full ">


            <ChatList
                chats={chats}
                title="Groups"
            />

        </div>
    );
}
