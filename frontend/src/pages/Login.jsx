import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

function Login({ setUserType }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha })
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('tipo_usuario', data.tipo_usuario);
        setUserType(data.tipo_usuario);
        setError('');
        navigate('/dashboard');
      } else {
        setError(data.error || 'Erro ao fazer login');
      }
    } catch {
      setError('Erro de rede');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="email" placeholder="E-mail" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={senha}
          onChange={(e) => setSenha(e.target.value)} required />
        <button className="btn btn-primary" type="submit">Entrar</button>
      </form>
      <ErrorMessage message={error} />
    </div>
  );
}

export default Login;
