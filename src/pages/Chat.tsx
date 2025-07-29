import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
}

interface Contact {
  userId: number;
  name: string; // adaptar se a API trouxer nomes
}

function ChatGeral() {
  const { user } = useAuth();
  const loggedUserId = user?.id;
  const [messages, setMessages] = useState<Message[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get('/messages')
      .then((res) => {
        setMessages(res.data);
        const uniqueContacts: Record<number, Contact> = {};

        res.data.forEach((msg: Message) => {
          const contactId = msg.sender_id === loggedUserId ? msg.receiver_id : msg.sender_id;

          if (!uniqueContacts[contactId]) {
            uniqueContacts[contactId] = {
              userId: contactId,
              name: `Usuário ${contactId}`, // ou puxar nome se disponível
            };
          }
        });

        setContacts(Object.values(uniqueContacts));
      })
      .catch(err => console.error('Erro ao buscar mensagens:', err));
  }, [loggedUserId]);

  return (
    <div>
      <h2>Conversas</h2>
      {contacts.map((contact) => (
        <div
          key={contact.userId}
          onClick={() => navigate(`/messages/${contact.userId}`)}
          style={{ cursor: 'pointer', borderBottom: '1px solid #ddd', padding: '10px 0' }}
        >
          {contact.name}
        </div>
      ))}
    </div>
  );
}

export default ChatGeral;
