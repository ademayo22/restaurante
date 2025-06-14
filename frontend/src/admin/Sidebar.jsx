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
    <aside className="sidebar-admin bg-yellow-700 text-white min-h-screen p-8 rounded-r-3xl shadow-lg flex flex-col items-start">
      <h2 className="text-2xl font-bold mb-10">Admin</h2>
      <nav className="w-full">
        <ul className="w-full">
          <li className={`mb-6 ${location.pathname === '/admin/platos' ? 'font-extrabold underline' : ''}`}>
            <Link to="/admin/platos" className="w-full block py-2">Platos</Link>
          </li>
          <li className={`mb-6 ${location.pathname === '/admin/usuarios' ? 'font-extrabold underline' : ''}`}>
            <Link to="/admin/usuarios" className="w-full block py-2">Usuarios</Link>
          </li>
        </ul>
        <button
          className="mt-12 w-full bg-red-600 py-2 rounded font-bold hover:bg-red-700 transition"
          onClick={logout}
        >
          Cerrar sesión
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
