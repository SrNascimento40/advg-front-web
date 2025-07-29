import { useEffect, useState } from 'react';
import api from '../services/api';
import { IoDocumentTextOutline } from 'react-icons/io5';

interface Invoice {
  id: number;
  description: string;
  value: string;
  status: string;
  deadline: string;
}

function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/invoices')
      .then((res) => {
        const formatted = res.data.map((inv: any) => ({
          id: inv.id,
          description: inv.description,
          value: formatCurrency(inv.value),
          status: inv.status,
          deadline: formatDate(inv.deadline),
        }));
        setInvoices(formatted);
      })
      .catch((err) => {
        console.error('Erro ao buscar faturas:', err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return <p>Carregando faturas...</p>;
  }

  return (
    <div className="invoices-container">
      <h2 className="invoices-header">Faturas</h2>
      {invoices.map((item) => (
        <div key={item.id} className="invoice-card">
          <IoDocumentTextOutline
            size={24}
            color={item.status === 'pago' ? '#28a745' : '#dc3545'}
          />
          <div className="invoice-info">
            <p className="invoice-description">{item.description}</p>
            <p className="invoice-details">
              Vencimento: {item.deadline} • {item.value}
            </p>
          </div>
          <p className={`invoice-status ${item.status === 'pago' ? 'paid' : 'pending'}`}>
            {item.status === 'pago' ? 'Pago' : 'Pendente'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Invoices;
