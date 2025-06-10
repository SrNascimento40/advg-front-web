import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const LawyerDashboard = () => {
  const { isAuthenticated, user, isLoading } = useAuth();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Carregando autenticação...</div>;
  }

  if (!isAuthenticated || user?.role !== 'advogado') {
    navigate("/login");
    return null;
  }

  return (
    <div>
      <h1>Bem-vindo à Plataforma de Advogados e Clientes!</h1>
      <p>Aqui você poderá gerenciar homepage processos, clientes e muito mais.</p>
    </div>
  );

};

export default LawyerDashboard;
