import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Menu() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <div>
      <h2>Panel de Administración</h2>
      <nav>
        <Link to="/admin/platos">Administrar Platos</Link> |{" "}
        <Link to="/admin/usuarios">Administrar Usuarios</Link> |{" "}
        <button onClick={logout}>Cerrar sesión</button>
      </nav>
    </div>
  );
}

export default Menu;
