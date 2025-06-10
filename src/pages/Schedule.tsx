import { IoCalendarOutline } from 'react-icons/io5'; // Ionicons versão web

interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  lawyer: string;
}

const schedule: Appointment[] = [
  { id: '1', title: 'Consulta inicial', date: '2025-03-20', time: '10:00 AM', lawyer: 'Dr. John Doe' },
  { id: '2', title: 'Audiência trabalhista', date: '2025-03-22', time: '02:30 PM', lawyer: 'Dr. Jane Smith' },
  { id: '3', title: 'Revisão de contrato', date: '2025-03-25', time: '04:00 PM', lawyer: 'Dr. Alan Turing' },
];

const Schedule = () => {
  return (
    <div className="schedule-container">
      <h2 className="schedule-header">Agenda</h2>
      {schedule.map((item) => (
        <div key={item.id} className="appointment-card">
          <IoCalendarOutline size={24} color="#007bff" />
          <div className="appointment-info">
            <p className="appointment-title">{item.title}</p>
            <p className="appointment-details">{item.date} • {item.time}</p>
            <p className="appointment-lawyer">Com: {item.lawyer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Schedule;
