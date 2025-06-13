import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './carta/Home';
import PlatoDetalle from './carta/PlatoDetalle';

import Login from './admin/Login';
import AdminLayout from './admin/AdminLayout';
import Platos from './admin/Platos';
import Usuarios from './admin/Usuarios';

function App() {
  const token = localStorage.getItem('token');
  return (
    <Router>
      <Routes>
        {/* Vista pública */}
        <Route path="/" element={<Home />} />
        <Route path="/plato/:id" element={<PlatoDetalle />} />

        {/* Panel Admin con Sidebar */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/platos"
          element={token ? <Platos /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin/usuarios"
          element={token ? <Usuarios /> : <Navigate to="/admin/login" />}
        />
        <Route
          path="/admin"
          element={token ? <AdminLayout><h2 className="titulo">Bienvenido al panel de administración</h2></AdminLayout> : <Navigate to="/admin/login" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;

