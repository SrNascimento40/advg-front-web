import { useNavigate } from 'react-router-dom'; 
import '../styles/Dashboard.css';

interface MenuItem {
  name: string;
  icon: string; 
  routeName: string; 
}

const Dashboard = () => {

  const navigate = useNavigate(); 

  const menuItems: MenuItem[] = [
    { name: 'Processos', icon: 'briefcase', routeName: '/processes' },
    { name: 'Agenda', icon: 'calendar', routeName: '/schedule' },
    { name: 'Mensagens', icon: 'chatbubble', routeName: '/messages' },
    { name: 'Faturas', icon: 'document-text', routeName: '/invoices' },
    { name: 'Perfil', icon: 'person', routeName: '/perfil' },
    { name: 'Configurações', icon: 'settings', routeName: '/settings' },
  ];

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'briefcase':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
          </svg>
        );
      case 'calendar':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="16" y1="2" x2="16" y2="6"></line>
            <line x1="8" y1="2" x2="8" y2="6"></line>
            <line x1="3" y1="10" x2="21" y2="10"></line>
          </svg>
        );
      case 'chatbubble':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 11.5a2.5 2.5 0 0 0-5 0v5a2.5 2.5 0 0 1-5 0V7a2.5 2.5 0 0 0-5 0v10.5a2.5 2.5 0 0 1-5 0"></path>
          </svg>
        );
      case 'document-text':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <line x1="10" y1="9" x2="8" y2="9"></line>
          </svg>
        );
      case 'person':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="7" r="4"></circle>
            <path d="M12 14v8"></path>
            <path d="M5 21v-1a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v1"></path>
          </svg>
        );
      case 'settings':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#007bff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83l-.99.99a2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33H9.6a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0l-.99-.99a2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0-.33-1.82V9.6a1.65 1.65 0 0 0 .33-1.82l-.06-.06a2 2 0 0 1 0-2.83l.99-.99a2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82-.33h3.8a1.65 1.65 0 0 0 1.82.33l.06-.06a2 2 0 0 1 2.83 0l.99.99a2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v3.8z"></path>
          </svg>
        );
      default:
        return null; // ou um ícone padrão
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className="dashboard-item"
            onClick={() => navigate(item.routeName)} // Usa navigate para ir para a rota
          >
            {renderIcon(item.icon)}
            <p className="dashboard-item-text">{item.name}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;