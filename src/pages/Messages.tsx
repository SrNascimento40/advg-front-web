import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import useAuth from '../hooks/useAuth';

interface Message {
  id: number;
  sender_id: number;
  receiver_id: number;
  content: string;
}
 
function Messages() {
  const { user } = useAuth();
  const loggedUserId = user?.id;
  const { userId } = useParams<{ userId: string }>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    api.get('/messages')
      .then((res) => {
        const conversation = res.data.filter((msg: Message) => (
          (msg.sender_id === loggedUserId && msg.receiver_id === Number(userId)) ||
          (msg.sender_id === Number(userId) && msg.receiver_id === loggedUserId)
        ));
        setMessages(conversation);
      })
      .catch(err => console.error('Erro ao carregar mensagens:', err));
  }, [loggedUserId, userId]);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    try {
      await api.post('/messages', {
        message: {
          content: input,
          receiver_id: Number(userId),
        }
      });
      setInput('');
      // Atualiza após enviar
      api.get('/messages').then((res) => {
        const conversation = res.data.filter((msg: Message) => (
          (msg.sender_id === loggedUserId && msg.receiver_id === Number(userId)) ||
          (msg.sender_id === Number(userId) && msg.receiver_id === loggedUserId)
        ));
        setMessages(conversation);
      });
    } catch (err) {
      console.error('Erro ao enviar mensagem:', err);
    }
  };

  return (
    <div>
      <h2>Conversando com usuário {userId}</h2>
      <div>
        {messages.map(msg => (
          <div
            key={msg.id}
            style={{
              textAlign: msg.sender_id === loggedUserId ? 'right' : 'left',
              margin: '5px 0'
            }}
          >
            {msg.content}
          </div>
        ))}
      </div>

      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Enviar</button>
      </div>
    </div>
  );
}

export default Messages;
