import { useState, useEffect } from 'react';

interface AuthState {
  isAuthenticated: boolean;
  user: { name: string; role: 'advogado' | 'cliente' } | null;
  isLoading: boolean;
}

const useAuth = (): AuthState => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  useEffect(() => {
    // Simula uma chamada API para verificar o status de autenticação
    const checkAuth = async () => {
      try {
        setAuthState((prev) => ({ ...prev, isLoading: true }));
        const token = localStorage.getItem('authToken');
        if (token) {
          // Em um cenário real, você decodificaria o token ou faria uma chamada API
          // para validar e obter os dados do usuário.
          const dummyUser = { name: 'João Silva', role: 'advogado' as 'advogado' }; // Exemplo
          setAuthState({ isAuthenticated: true, user: dummyUser, isLoading: false });
        } else {
          setAuthState({ isAuthenticated: false, user: null, isLoading: false });
        }
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
