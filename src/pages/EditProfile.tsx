import { useState } from 'react';

interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
}

const EditProfile = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleChange = (key: keyof User, value: string) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log('Saving user:', user);
    // lógica de envio para o backend
  };

  return (
    <div className="edit-profile-container">
      <h2 className="edit-profile-header">Edit Profile</h2>

      <input
        className="edit-profile-input"
        type="text"
        placeholder="Name"
        value={user.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />
      <input
        className="edit-profile-input"
        type="email"
        placeholder="Email"
        value={user.email}
        onChange={(e) => handleChange('email', e.target.value)}
      />
      <input
        className="edit-profile-input"
        type="tel"
        placeholder="Phone"
        value={user.phone}
        onChange={(e) => handleChange('phone', e.target.value)}
      />
      <button className="edit-profile-save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default EditProfile;