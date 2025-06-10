import { IoDocumentTextOutline } from 'react-icons/io5';

interface Invoice {
  id: string;
  lawyer: string;
  dueDate: string;
  amount: string;
  paid: boolean;
}

const invoices: Invoice[] = [
  { id: '1', lawyer: 'Dr. John Doe', dueDate: '2024-04-10', amount: 'R$ 1.200,00', paid: true },
  { id: '2', lawyer: 'Dr. Jane Smith', dueDate: '2024-04-15', amount: 'R$ 850,00', paid: false },
  { id: '3', lawyer: 'Dr. Alan Turing', dueDate: '2024-04-20', amount: 'R$ 3.500,00', paid: true },
];

function Invoices() {
  return (
    <div className="invoices-container">
      <h2 className="invoices-header">Faturas</h2>
      {invoices.map((item) => (
        <div key={item.id} className="invoice-card">
          <IoDocumentTextOutline
            size={24}
            color={item.paid ? '#28a745' : '#dc3545'}
          />
          <div className="invoice-info">
            <p className="invoice-lawyer">{item.lawyer}</p>
            <p className="invoice-details">Due: {item.dueDate} • {item.amount}</p>
          </div>
          <p className={`invoice-status ${item.paid ? 'paid' : 'pending'}`}>
            {item.paid ? 'Pago' : 'Pendente'}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Invoices;
