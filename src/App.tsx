import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LawyerDashboard from './pages/LawyerDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Login from './pages/Login';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Advogados & Clientes</Link>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">Início</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/advogado">Dashboard Advogado</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cliente">Dashboard Cliente</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/advogado" element={<LawyerDashboard />} />
          <Route path="/cliente" element={<ClientDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/chat" element={<Chat userName="blue" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;