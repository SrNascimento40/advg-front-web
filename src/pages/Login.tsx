import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// local
// const API_URL = 'http://127.0.0.1:3000';

// prod
const API_URL = 'https://avdg-backend-production.up.railway.app/users/sign_in'

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      const res = await fetch(`${API_URL}/users/sign_in`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user: { email, password } }),
      });
  
      if (res.ok) {
        await res.json();
  
        // ⬇️ extrair token do header Authorization
        const authHeader = res.headers.get('Authorization');
        console.log('Authorization Header:', authHeader);
        console.log('res:', res);
        if (authHeader && authHeader.startsWith('Bearer ')) {
          const token = authHeader.split(' ')[1];
          localStorage.setItem('token', token); // ✅ salva localmente
        }
  
        alert('Login realizado com sucesso!');
        navigate('/');
      } else {
        const data = await res.json();
        alert(data.error || 'Erro ao fazer login');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Erro ao fazer login');
    } finally {
      setLoading(false);
    }
  };    

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-3">Login</h3>
        <p className="text-center text-muted mb-4">Acesse sua conta para gerenciar processos, clientes e mais.</p>

        <form onSubmit={handleLogin}>
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

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            <button
              type="button"
              className="btn btn-link p-0"
              onClick={() => navigate('/forgot-password')}
            >
              Esqueci minha senha
            </button>
          </div>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted">Não tem uma conta?</span>
          <button
            type="button"
            className="btn btn-link"
            onClick={() => navigate('/register')}
          >
            Criar conta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
