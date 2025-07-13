import { useNavigate } from 'react-router-dom';
import {
  IoPersonCircleOutline,
  IoNotificationsOutline,
  IoMoonOutline,
  IoLogOutOutline,
} from 'react-icons/io5';

function Settings() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };  

  const showComingSoon = () => {
    alert('Feature not available yet');
  };

  return (
    <div className="settings-container">
      <h2 className="settings-header">Settings</h2>

      <div className="settings-option" onClick={() => navigate('/edit_profile')}>
        <IoPersonCircleOutline size={24} color="#007bff" />
        <span className="settings-text">Edit Profile</span>
      </div>

      <div className="settings-option" onClick={showComingSoon}>
        <IoNotificationsOutline size={24} color="#007bff" />
        <span className="settings-text">Notifications</span>
      </div>

      <div className="settings-option" onClick={showComingSoon}>
        <IoMoonOutline size={24} color="#007bff" />
        <span className="settings-text">Dark Mode</span>
      </div>

      <div className="settings-option logout" onClick={handleLogout}>
        <IoLogOutOutline size={24} color="#dc3545" />
        <span className="settings-text logout-text">Logout</span>
      </div>
    </div>
  );
}

export default Settings;
