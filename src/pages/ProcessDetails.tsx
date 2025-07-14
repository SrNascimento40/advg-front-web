import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

interface LegalCase {
  id: number;
  title: string;
  status: string;
  description: string;
  created_at: string;
  execution_date: string;
}

function ProcessDetails() {
  const { id } = useParams<{ id: string }>();
  const [processDetails, setProcessDetails] = useState<LegalCase | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    api.get(`/legal_cases/${id}`)
      .then((res) => {
        setProcessDetails(res.data);
        console.log('Processo Detalhes:', res.data);
        
      })
      .catch((err) => {
        console.error('Erro ao buscar detalhes do processo:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Carregando detalhes do processo...</p>;
  }

  if (!processDetails) {
    return <p>Processo não encontrado.</p>;
  }

  return (
    <div className="process-container">
      <h2 className="process-header">{processDetails.title}</h2>
      <p className="process-status">Status: {processDetails.status}</p>
        <div key={processDetails.id} className="timeline-item">
          <div className="timeline-text">
            <p className="timeline-date">Processo criado em {new Date(processDetails.created_at).toLocaleDateString('pt-BR')}</p>
            <p className="timeline-description">descrição do processo: {processDetails.description}</p>
            {processDetails.execution_date && (
              <p className="timeline-execution">Data de execução: {new Date(processDetails.execution_date).toLocaleDateString('pt-BR')}</p>
            )}
          </div>
        </div>
    </div>
  );
}

export default ProcessDetails;
