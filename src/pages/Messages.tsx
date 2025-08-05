import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Messages.css';

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const Messages = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      name: 'Dr. Silva',
      lastMessage: 'Enviei os documentos que você solicitou.',
      timestamp: '09:30',
      unreadCount: 2,
    },
    {
      id: '2',
      name: 'Cliente João',
      lastMessage: 'Obrigado pela ajuda!',
      timestamp: 'Ontem',
      unreadCount: 0,
    },
    {
      id: '3',
      name: 'Equipe Jurídica',
      lastMessage: 'Reunião às 14h está confirmada.',
      timestamp: 'Seg',
      unreadCount: 5,
    },
  ]);

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="messages-container">
      <header className="messages-header">
        <h2>Mensagens</h2>
      </header>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Pesquisar..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="conversation-list">
        {filtered.map((conv) => (
          <button
            key={conv.id}
            className="conversation-item"
            onClick={() => navigate(`/chat/${encodeURIComponent(conv.name)}`)}
          >
            <div className="avatar">
              {conv.name.charAt(0)}
            </div>
            <div className="conversation-details">
              <div className="conversation-header">
                <span className="conversation-name">{conv.name}</span>
                <span className="conversation-time">{conv.timestamp}</span>
              </div>
              <div className="conversation-preview">{conv.lastMessage}</div>
            </div>
            {conv.unreadCount > 0 && (
              <span className="unread-badge">{conv.unreadCount}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Messages;