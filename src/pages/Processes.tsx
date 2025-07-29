import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoDocumentText } from 'react-icons/io5';
import api from '../services/api';

interface LegalCase {
  id: number;
  title: string;
  status: string;
}

function Processes() {
  const navigate = useNavigate();
  const [processes, setProcesses] = useState<LegalCase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/legal_cases')
      .then((res) => {
        setProcesses(res.data);
      })
      .catch((err) => {
        console.error('Erro ao buscar processos:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const goToDetails = (processId: number) => {
    navigate(`/process_details/${processId}`);
  };

  if (loading) {
    return <p>Carregando processos...</p>;
  }

  return (
    <div className="processes-container">
      <h2 className="processes-header">Meus Processos</h2>
      {processes.map((item) => (
        <div
          key={item.id}
          className="process-card"
          onClick={() => goToDetails(item.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && goToDetails(item.id)}
        >
          <div className="icon-container">
            <IoDocumentText size={30} color="#007bff" />
          </div>
          <div className="text-container">
            <p className="process-title">{item.title}</p>
            <p className="process-status">{item.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Processes;
