import {
  IoDocumentTextOutline,
  IoMailOutline,
  IoCalendarOutline,
  IoBriefcaseOutline,
} from 'react-icons/io5';

interface TimelineItem {
  id: string;
  date: string;
  description: string;
  icon: 'document-text-outline' | 'mail-outline' | 'calendar-outline' | 'briefcase-outline';
}

const processDetails = {
  id: '1',
  title: 'Processo Trabalhista',
  status: 'Em andamento',
  timeline: [
    { id: '1', date: '2025-03-01', description: 'Abertura do processo', icon: 'document-text-outline' },
    { id: '2', date: '2025-03-05', description: 'Petição inicial enviada', icon: 'mail-outline' },
    { id: '3', date: '2025-03-10', description: 'Primeira audiência marcada', icon: 'calendar-outline' },
    { id: '4', date: '2025-03-15', description: 'Audiência realizada', icon: 'briefcase-outline' },
  ] as TimelineItem[],
};

// Mapeamento de string para ícone
const iconMap = {
  'document-text-outline': IoDocumentTextOutline,
  'mail-outline': IoMailOutline,
  'calendar-outline': IoCalendarOutline,
  'briefcase-outline': IoBriefcaseOutline,
};

function ProcessDetails() {
  return (
    <div className="process-container">
      <h2 className="process-header">{processDetails.title}</h2>
      <p className="process-status">Status: {processDetails.status}</p>

      {processDetails.timeline.map((item) => {
        const IconComponent = iconMap[item.icon];
        return (
          <div key={item.id} className="timeline-item">
            <IconComponent size={24} color="#007bff" />
            <div className="timeline-text">
              <p className="timeline-date">{item.date}</p>
              <p className="timeline-description">{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ProcessDetails;
