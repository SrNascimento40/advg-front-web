import { useNavigate } from 'react-router-dom';
import { IoDocumentText } from 'react-icons/io5';

interface ProcessItem {
  id: string;
  title: string;
  status: string;
}

const processes: ProcessItem[] = [
  { id: '1', title: 'Process #12345', status: 'Em andamento' },
  { id: '2', title: 'Process #67890', status: 'Finalizado' },
  { id: '3', title: 'Process #54321', status: 'Iniciado' },
];

function Processes() {
  const navigate = useNavigate();

  const goToDetails = () => {
    navigate(`/process_details`);
    // navigate(`/process_details/${processId}`); o ideal é esse puxando info do id
  };

  return (
    <div className="processes-container">
      <h2 className="processes-header">Meus Processos</h2>
      {processes.map((item) => (
        <div
          key={item.id}
          className="process-card"
          onClick={() => goToDetails()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && goToDetails()}
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
