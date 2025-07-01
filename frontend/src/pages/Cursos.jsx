import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Cursos({ tipoUsuario }) {
  const [cursos, setCursos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/cursos', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => res.json())
      .then(setCursos)
      .catch(() => setMessage('Erro ao carregar cursos'));
  }, []);

  const inscrever = async (cursoId) => {
    try {
      const res = await fetch('http://localhost:3000/api/inscricoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ usuarioId: 1, cursoId })
      });
      if (res.ok) {
        setMessage('✅ Inscrição realizada!');
      } else {
        setMessage('Erro ao se inscrever');
      }
    } catch {
      setMessage('Erro de rede');
    }
  };

  return (
    <div className="container">
      <h2>🎓 Cursos disponíveis</h2>
      {cursos.map(curso => (
        <div key={curso.id} className="course-card">
          <h3 className="course-title">{curso.titulo}</h3>
          <p className="course-desc">{curso.descricao}</p>
          <Link to={`/curso/${curso.id}`} className="btn btn-primary">Ver detalhes</Link>
          {tipoUsuario === 'aluno' && (
            <button className="btn btn-success" onClick={() => inscrever(curso.id)}>
              Inscrever-se
            </button>
          )}
        </div>
      ))}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Cursos;
