import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// local
// const API_URL = 'http://127.0.0.1:3000';

// prod
const API_URL = 'https://avdg-backend-production.up.railway.app/users/sign_in'

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      alert('As senhas não conferem.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: {
            name,
            email,
            password,
            password_confirmation: passwordConfirmation,
            phone,
            role: 'client', // ou permita selecionar se necessário
          },
        }),
        credentials: 'include',
      });

      if (res.ok) {
        alert('Cadastro realizado com sucesso!');
        navigate('/login');
      } else {
        const data = await res.json();
        console.error(data);
        alert(data.error || 'Erro ao cadastrar');
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      alert('Erro ao cadastrar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="card p-4 shadow-sm" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-3">Criar Conta</h3>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <label className="form-label">Nome</label>
            <input
              type="text"
              className="form-control"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Telefone</label>
            <input
              type="tel"
              className="form-control"
              placeholder="Digite seu telefone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">E-mail</label>
            <input
              type="email"
              className="form-control"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Digite sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirme a Senha</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirme sua senha"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={loading}>
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="text-center mt-3">
          <span className="text-muted">Já possui uma conta?</span>
          <button type="button" className="btn btn-link" onClick={() => navigate('/login')}>
            Entrar
          </button>
        </div>
      </div>
    </div>
  );
}

export default Register;
