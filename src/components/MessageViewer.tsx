import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Trash2, Eye, EyeOff, Download } from 'lucide-react';

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  timestamp: string;
}

const MessageViewer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showMessages, setShowMessages] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = () => {
    try {
      const storedMessages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
      setMessages(storedMessages);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const handleAuth = () => {
    // Simple password check - you can change this password
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setShowMessages(true);
    } else {
      alert('Incorrect password');
    }
  };

  const deleteMessage = (id: number) => {
    const updatedMessages = messages.filter(msg => msg.id !== id);
    setMessages(updatedMessages);
    localStorage.setItem('contactMessages', JSON.stringify(updatedMessages));
  };

  const exportMessages = () => {
    const dataStr = JSON.stringify(messages, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `contact-messages-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="card max-w-md w-full"
        >
          <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
            Message Viewer
          </h2>
          <div className="space-y-4">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 bg-dark-700 border border-dark-600 rounded-lg text-gray-100 placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors"
            />
            <button
              onClick={handleAuth}
              className="btn-primary w-full"
            >
              Access Messages
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-900 p-4">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-100">
              Contact Messages
            </h1>
            <div className="flex gap-4">
              <button
                onClick={() => setShowMessages(!showMessages)}
                className="btn-secondary flex items-center gap-2"
              >
                {showMessages ? <EyeOff size={20} /> : <Eye size={20} />}
                {showMessages ? 'Hide' : 'Show'} Messages
              </button>
              <button
                onClick={exportMessages}
                className="btn-primary flex items-center gap-2"
              >
                <Download size={20} />
                Export
              </button>
            </div>
          </div>
          
          <div className="text-gray-400">
            Total Messages: {messages.length}
          </div>
        </motion.div>

        {showMessages && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <Mail size={48} className="mx-auto mb-4 opacity-50" />
                <p>No messages yet</p>
              </div>
            ) : (
              messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="card"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-100 mb-2">
                        {message.name}
                      </h3>
                      <p className="text-primary-400 mb-1">{message.email}</p>
                      <p className="text-gray-400 text-sm">
                        {formatDate(message.timestamp)}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteMessage(message.id)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                      title="Delete message"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="bg-dark-700 rounded-lg p-4">
                    <p className="text-gray-300 whitespace-pre-wrap">
                      {message.message}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MessageViewer; 