import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage';

function CursoDetalhe({ tipoUsuario }) {
  const { id } = useParams();
  const [curso, setCurso] = useState(null);
  const [modulos, setModulos] = useState([]);
  const [message, setMessage] = useState('');
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novoConteudo, setNovoConteudo] = useState('');

  useEffect(() => {
    carregarDados();
  }, [id]);

  const carregarDados = () => {
    fetch(`http://localhost:3000/api/cursos/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(setCurso)
    .catch(() => setMessage('Erro ao carregar curso'));

    fetch(`http://localhost:3000/api/modulos?cursoId=${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    .then(res => res.json())
    .then(setModulos)
    .catch(() => setMessage('Erro ao carregar módulos'));
  };

  const marcarConcluido = async (moduloId) => {
    try {
      const res = await fetch('http://localhost:3000/api/progresso', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ usuarioId: 1, moduloId, status: 'concluido' })
      });
      if (res.ok) {
        setMessage('✅ Módulo marcado como concluído!');
      } else {
        setMessage('Erro ao marcar módulo');
      }
    } catch {
      setMessage('Erro de rede');
    }
  };

  const criarModulo = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/modulos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ titulo: novoTitulo, conteudo: novoConteudo, cursoId: id })
      });
      if (res.ok) {
        setMessage('✅ Módulo criado!');
        setNovoTitulo('');
        setNovoConteudo('');
        carregarDados();
      } else {
        setMessage('Erro ao criar módulo');
      }
    } catch {
      setMessage('Erro de rede');
    }
  };

  const deletarModulo = async (moduloId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/modulos/${moduloId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      if (res.ok) {
        setMessage('✅ Módulo deletado!');
        carregarDados();
      } else {
        setMessage('Erro ao deletar módulo');
      }
    } catch {
      setMessage('Erro de rede');
    }
  };

  return (
    <div className="container">
      <h2 className="course-title">📚 {curso ? curso.titulo : 'Carregando curso...'}</h2>
      {curso && <p className="course-desc">{curso.descricao}</p>}

      {tipoUsuario === 'instrutor' && (
        <div className="course-card">
          <h4 style={{ color: '#2980b9' }}>✍ Criar novo módulo</h4>
          <input type="text" placeholder="Título do módulo"
                 value={novoTitulo} onChange={(e) => setNovoTitulo(e.target.value)} />
          <textarea placeholder="Conteúdo do módulo"
                    value={novoConteudo} onChange={(e) => setNovoConteudo(e.target.value)} />
          <button className="btn btn-success" onClick={criarModulo}>Salvar módulo</button>
        </div>
      )}

      <h4 style={{ marginTop: '2rem' }}>📝 Módulos</h4>
      {modulos.map(modulo => (
        <div key={modulo.id} className="course-card">
          <h5 className="course-title">{modulo.titulo}</h5>
          <p className="course-desc">{modulo.conteudo}</p>
          {tipoUsuario === 'aluno' && (
            <button className="btn btn-primary" onClick={() => marcarConcluido(modulo.id)}>Marcar como concluído</button>
          )}
          {tipoUsuario === 'instrutor' && (
            <button className="btn btn-danger" onClick={() => deletarModulo(modulo.id)}>Excluir módulo</button>
          )}
        </div>
      ))}

      <ErrorMessage message={message} />
    </div>
  );
}

export default CursoDetalhe;
