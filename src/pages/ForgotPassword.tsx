import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// local
// const API_URL = 'http://127.0.0.1:3000';

// prod
const API_URL = 'https://avdg-backend-production.up.railway.app/users/sign_in'

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/users/password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        alert('Instruções de recuperação enviadas para seu e-mail.');
        navigate('/login');
      } else {
        const data = await res.json();
        alert(data.error || 'Erro ao enviar instruções de recuperação.');
      }
    } catch (error) {
      console.error('Erro ao solicitar recuperação de senha:', error);
      alert('Erro ao solicitar recuperação de senha.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-3">Recuperar Senha</h3>
        <p className="text-center text-muted mb-4">
          Digite seu e-mail para receber instruções de recuperação de senha.
        </p>

        <form onSubmit={handleForgotPassword}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Enviando...' : 'Enviar Instruções'}
          </button>
        </form>

        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate('/login')}
          >
            Voltar para Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
