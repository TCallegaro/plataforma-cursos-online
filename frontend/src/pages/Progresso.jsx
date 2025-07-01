import React, { useEffect, useState } from 'react';

function Progresso() {
  const [progresso, setProgresso] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/api/progresso', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(setProgresso)
    .catch(() => setMessage('Erro ao carregar progresso'));
  }, []);

  return (
    <div className="container">
      <h2>📈 Meu Progresso</h2>
      {progresso.length > 0 ? (
        progresso.map(item => (
          <div key={item.id} className="course-card">
            <p><strong>Módulo ID:</strong> {item.moduloId}</p>
            <p><strong>Status:</strong> {item.status || 'pendente'}</p>
          </div>
        ))
      ) : (
        <p className="course-desc" style={{ marginTop: '1rem' }}>
          Você ainda não começou nenhum módulo.
        </p>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default Progresso;
