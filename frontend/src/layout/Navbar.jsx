import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ userType, onLogout }) {
  return (
    <nav style={{ 
      background: '#2c3e50', 
      padding: '1rem', 
      display: 'flex', 
      justifyContent: 'center', 
      gap: '1rem' 
    }}>
      {!userType && (
        <>
          <Link to="/login"><button className="btn btn-primary">Login</button></Link>
          <Link to="/register"><button className="btn btn-success">Cadastro</button></Link>
        </>
      )}

      {userType === 'aluno' && (
        <>
          <Link to="/dashboard"><button className="btn btn-primary">Dashboard</button></Link>
          <Link to="/cursos"><button className="btn btn-primary">Cursos</button></Link>
          <Link to="/progresso"><button className="btn btn-success">Meu Progresso</button></Link>
          <button className="btn btn-danger" onClick={onLogout}>Logout</button>
        </>
      )}

      {userType === 'instrutor' && (
        <>
          <Link to="/dashboard"><button className="btn btn-primary">Meu Painel</button></Link>
          <button className="btn btn-danger" onClick={onLogout}>Logout</button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
