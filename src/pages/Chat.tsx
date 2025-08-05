import { useState, useRef, useEffect } from 'react';
import '../styles/Chat.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'lawyer';
  timestamp: string;
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Olá, como posso ajudar?',
      sender: 'lawyer',
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        text: trimmed,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setInput('');
    // Simulate lawyer response after 1 second
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: 'Entendi. Em que posso ajudar com seu processo?',
          sender: 'lawyer',
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <button className="back-button" onClick={() => window.history.back()}>
          ←
        </button>
        <h2 className="chat-title">Wallace</h2>
      </header>
      <div className="messages-wrapper">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`message-bubble ${msg.sender === 'user' ? 'sent' : 'received'}`}
          >
            <span className="message-text">{msg.text}</span>
            <span className="message-meta">{msg.timestamp}</span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="input-area">
        <input
          type="text"
          className="chat-input"
          placeholder="Digite uma mensagem..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') sendMessage();
          }}
        />
        <button className="send-button" onClick={sendMessage}>
          ➤
        </button>
      </div>
    </div>
  );
};

export default Chat;