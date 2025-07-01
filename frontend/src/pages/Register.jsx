import React, { useState } from 'react';
import ErrorMessage from '../components/ErrorMessage';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('aluno');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: username,
          email,
          senha: password,
          tipo_usuario: tipoUsuario
        })
      });
      const data = await response.json();

      if (response.ok) {
        setSuccess('Cadastro realizado com sucesso!');
        setError('');
      } else {
        setError(data.message || 'Erro ao cadastrar');
      }
    } catch {
      setError('Erro de rede');
    }
  };

  return (
    <div className="container">
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Nome" value={username}
          onChange={(e) => setUsername(e.target.value)} required />
        <input type="email" placeholder="E-mail" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <select value={tipoUsuario} onChange={(e) => setTipoUsuario(e.target.value)} required>
          <option value="aluno">Aluno</option>
          <option value="instrutor">Instrutor</option>
        </select>
        <button className="btn btn-success" type="submit">Cadastrar</button>
      </form>
      <ErrorMessage message={error || success} />
    </div>
  );
}

export default Register;
