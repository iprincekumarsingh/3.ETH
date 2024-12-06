import React, { useState, useRef, useEffect } from 'react';
import { User, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  avatar?: string;
}

function ChatScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm a bot assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full bg-gray-900 h-screen">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-800 bg-black/90 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <Bot className="w-8 h-8 text-purple-500" />
          <div>
            <h2 className="text-xl font-bold text-white">Intitate New CHAT</h2>
            {/* <p className="text-sm text-gray-400">Always here to help</p> */}
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-900 to-black">
        {messages.map(message => (
          <div
            key={message.id}
            className={`flex items-end gap-2 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === 'bot' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
            )}
            
            <div
              className={`max-w-[70%] rounded-lg p-4 ${
                message.sender === 'user'
                  ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-800/90 text-gray-200 border border-gray-700/50'
              }`}
            >
              <p className="leading-relaxed">{message.text}</p>
              <span className="text-xs opacity-70 mt-2 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>

            {message.sender === 'user' && (
              <div className="w-8 h-8 rounded-full overflow-hidden">
                <img 
                  src={message.avatar} 
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div className="bg-gray-800/90 text-gray-200 rounded-lg p-4 border border-gray-700/50">
              <div className="flex gap-2">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce delay-100">●</span>
                <span className="animate-bounce delay-200">●</span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form 
        onSubmit={handleSendMessage}
        className="p-4 border-t border-gray-800 bg-black/90 backdrop-blur-xl"
      >
        <div className="flex gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-gray-800/90 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-700/50"
          />
          <button
            type="submit"
            className="bg-gradient-to-br from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:opacity-90 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatScreen;