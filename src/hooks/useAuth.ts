import { useState, useEffect } from 'react';
import api from '../services/api';

interface User {
  id: number;
  name: string;
  role: 'advogado' | 'cliente';
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
}

const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setAuthState({ isAuthenticated: false, user: null, isLoading: false });
          return;
        }

        // ✅ define o token nos headers para todas as requests
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        // ✅ chama a rota /me
        const res = await api.get('/me');
        const userData = res.data;

        setAuthState({
          isAuthenticated: true,
          user: {
            id: userData.id,
            name: userData.name,
            role: userData.role,
          },
          isLoading: false,
        });
      } catch (error) {
        console.error('Erro ao verificar autenticação:', error);
        setAuthState({ isAuthenticated: false, user: null, isLoading: false });
      }
    };

    checkAuth();
  }, []);

  return authState;
};

export default useAuth;
