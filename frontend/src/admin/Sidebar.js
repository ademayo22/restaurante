import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  return (
    <aside className="sidebar-admin">
      <h2 className="titulo" style={{marginTop: 0}}>Admin</h2>
      <nav>
        <ul>
          <li className={location.pathname === '/admin/platos' ? 'active' : ''}>
            <Link to="/admin/platos">Platos</Link>
          </li>
          <li className={location.pathname === '/admin/usuarios' ? 'active' : ''}>
            <Link to="/admin/usuarios">Usuarios</Link>
          </li>
          <li>
            <button className="boton" onClick={logout}>Cerrar sesión</button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
