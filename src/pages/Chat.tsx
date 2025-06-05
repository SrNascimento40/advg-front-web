import { useState } from 'react';
// Se 'userName' vier de um parâmetro de rota (ex: /chat/:userName), você usaria:

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'lawyer';
}
interface ChatProps {
  userName: string; // Esperamos que userName seja passado como prop
}

const Chat = ({ userName }: ChatProps) => {
  // Se você usasse useParams para obter o userName da URL:
  // const { userName } = useParams<{ userName: string }>();
  // userName = userName || 'Usuário'; // Fallback caso userName não seja encontrado na URL

  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Olá, como posso ajudar?', sender: 'lawyer' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (input.trim() === '') return; // Verifica se a mensagem não está vazia ou só com espaços

    // Adiciona a nova mensagem do usuário
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: Date.now().toString(), text: input, sender: 'user' },
    ]);
    setInput(''); // Limpa o campo de input

    // Opcional: Simular uma resposta do advogado após um curto período
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: Date.now().toString() + '-lawyer', text: 'Entendi. Em que posso ajudar com seu processo?', sender: 'lawyer' },
      ]);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <h2 className="chat-header">{userName}</h2>
      <div className="chat-messages-list">
        {messages.map((item) => (
          <div
            key={item.id}
            className={`message ${item.sender === 'user' ? 'user-message' : 'lawyer-message'}`}
          >
            <p className="message-text">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="chat-input-container">
        <input
          type="text"
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Digite uma mensagem..."
          onKeyPress={(e) => { // Permite enviar mensagem ao pressionar Enter
            if (e.key === 'Enter') {
              sendMessage();
            }
          }}
        />
        <button className="send-button" onClick={sendMessage}>
          {/* Ícone de enviar SVG simples */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Chat;