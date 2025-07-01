import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './layout/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardAluno from './pages/DashboardAluno';
import DashboardInstrutor from './pages/DashboardInstrutor';
import CursoDetalhe from './pages/CursoDetalhe';
import Progresso from './pages/Progresso';

function App() {
  const [userType, setUserType] = useState(localStorage.getItem('tipo_usuario'));

  useEffect(() => {
    setUserType(localStorage.getItem('tipo_usuario'));
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUserType(null);
  };

  return (
    <BrowserRouter>
      <Navbar userType={userType} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Navigate to={userType ? "/dashboard" : "/login"} />} />

        <Route path="/login" element={<Login setUserType={setUserType} />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          userType === 'instrutor'
            ? <DashboardInstrutor />
            : userType === 'aluno'
              ? <DashboardAluno />
              : <Navigate to="/login" />
        } />

        <Route path="/curso/:id" element={
          userType 
            ? <CursoDetalhe tipoUsuario={userType} />
            : <Navigate to="/login" />
        } />

        <Route path="/progresso" element={
          userType === 'aluno'
            ? <Progresso />
            : <Navigate to="/dashboard" />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
