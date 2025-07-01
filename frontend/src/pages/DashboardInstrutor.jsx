import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function DashboardInstrutor() {
  const [cursos, setCursos] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [message, setMessage] = useState('');

  const carregarCursos = () => {
    fetch('http://localhost:3000/api/cursos', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(setCursos)
    .catch(() => setMessage('Erro ao carregar cursos'));
  };

  useEffect(() => {
    carregarCursos();
  }, []);

  const criarCurso = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/cursos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ titulo, descricao })
      });
      if (res.ok) {
        setMessage('✅ Curso criado!');
        setTitulo('');
        setDescricao('');
        carregarCursos();
      } else {
        setMessage('Erro ao criar curso');
      }
    } catch {
      setMessage('Erro de rede');
    }
  };

  return (
    <div className="container">
      <h2>🎓 Painel do Instrutor</h2>
      <div className="course-card" style={{ marginBottom: '2rem' }}>
        <h4 style={{ color: '#2980b9' }}>✍ Criar novo curso</h4>
        <input
          type="text"
          placeholder="Título do curso"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Descrição do curso"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        ></textarea>
        <button className="btn btn-success" onClick={criarCurso}>
          Criar curso
        </button>
      </div>

      <h4 style={{ marginBottom: '1rem' }}>📚 Meus Cursos</h4>
      {cursos.map(curso => (
        <div key={curso.id} className="course-card">
          <h3 className="course-title">{curso.titulo}</h3>
          <p className="course-desc">{curso.descricao}</p>
          <Link to={`/curso/${curso.id}`} className="btn btn-primary">
            Gerenciar módulos
          </Link>
        </div>
      ))}

      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default DashboardInstrutor;
