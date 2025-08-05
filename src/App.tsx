import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LawyerDashboard from './pages/LawyerDashboard';
import ClientDashboard from './pages/ClientDashboard';
import Login from './pages/Login';
import Chat from './pages/Chat';
import EditProfile from './pages/EditProfile';
import Schedule from './pages/Schedule';
import Invoices from './pages/Invoices';
import ProcessDetails from './pages/ProcessDetails';
import Processes from './pages/Processes';
import Settings from './pages/Settings';
import ForgotPassword from './pages/ForgotPassword';
import Register from './pages/Register';
import { RequireAuth } from './components/RequireAuth';
import Messages from './pages/Messages';

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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <HomePage />
              </RequireAuth>
            }
          />
          <Route
            path="/advogado"
            element={
              <RequireAuth>
                <LawyerDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/cliente"
            element={
              <RequireAuth>
                <ClientDashboard />
              </RequireAuth>
            }
          />
          <Route
            path="/chat/:userId"
            element={
              <RequireAuth>
                <Chat />
              </RequireAuth>
            }
          />
          <Route
            path="/messages"
            element={
              <RequireAuth>
                <Messages />
              </RequireAuth>
            }
          />
          <Route
            path="/edit_profile"
            element={
              <RequireAuth>
                <EditProfile  />
              </RequireAuth>
            }
          />
          <Route
            path="/schedule"
            element={
              <RequireAuth>
                <Schedule />
              </RequireAuth>
            }
          />
          <Route
            path="/invoices"
            element={
              <RequireAuth>
                <Invoices />
              </RequireAuth>
            }
          />
          <Route
            path="/settings"
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route
            path="/process_details/:id"
            element={
              <RequireAuth>
                <ProcessDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/processes"
            element={
              <RequireAuth>
                <Processes />
              </RequireAuth>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;