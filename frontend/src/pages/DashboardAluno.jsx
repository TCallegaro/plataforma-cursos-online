import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

function DashboardAluno() {
  const [cursos, setCursos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/inscricoes', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(setCursos)
    .catch(() => setMessage('Erro ao carregar suas inscrições'));
  }, []);

  return (
    <div className="container">
      <h2>📚 Meus Cursos</h2>
      <p className="course-desc">Aqui estão os cursos em que você está inscrito. Continue seu progresso!</p>
      
      {cursos.length > 0 ? (
        cursos.map(inscricao => (
          <div key={inscricao.id} className="course-card">
            <h3 className="course-title">{inscricao.Curso.titulo}</h3>
            <p className="course-desc">{inscricao.Curso.descricao}</p>
            <Link to={`/curso/${inscricao.Curso.id}`} className="btn btn-primary">
              Acessar curso
            </Link>
          </div>
        ))
      ) : (
        <p className="course-desc" style={{ marginTop: '1rem' }}>
          Você ainda não está inscrito em nenhum curso.
        </p>
      )}

      <ErrorMessage message={message} />
    </div>
  );
}

export default DashboardAluno;
