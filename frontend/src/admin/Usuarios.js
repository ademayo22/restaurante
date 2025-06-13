import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';

function Usuarios() {
  const token = localStorage.getItem('token');
  const [usuarios, setUsuarios] = useState([]);
  const [nuevo, setNuevo] = useState({ usuario: '', password: '', esAdmin: false });
  const [editando, setEditando] = useState(null);

  const fetchUsuarios = () => {
    fetch('http://localhost:5000/api/users', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setUsuarios);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const crearUsuario = async () => {
    await fetch('http://localhost:5000/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(nuevo),
    });
    setNuevo({ usuario: '', password: '', esAdmin: false });
    fetchUsuarios();
  };

  const eliminarUsuario = async (id) => {
    await fetch(`http://localhost:5000/api/users/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    fetchUsuarios();
  };

  const guardarEdicion = async () => {
    await fetch(`http://localhost:5000/api/users/${editando._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(editando),
    });
    setEditando(null);
    fetchUsuarios();
  };

  return (
    <AdminLayout>
      <h3 className="titulo">Usuarios Administrativos</h3>
      <ul className="lista">
        {usuarios.map(user => (
          <li key={user._id} className="item-lista">
            {editando && editando._id === user._id ? (
              <>
                <input className="input" value={editando.usuario} onChange={e => setEditando({ ...editando, usuario: e.target.value })} />
                <input type="checkbox" checked={editando.esAdmin} onChange={e => setEditando({ ...editando, esAdmin: e.target.checked })} /> Admin
                <button className="boton" onClick={guardarEdicion}>Guardar</button>
                <button className="boton" onClick={() => setEditando(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{user.usuario}</strong> {user.esAdmin && "(Admin)"}
                <button className="boton" onClick={() => setEditando(user)}>Editar</button>
                <button className="boton" onClick={() => eliminarUsuario(user._id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h4>Crear nuevo usuario</h4>
      <form onSubmit={e => { e.preventDefault(); crearUsuario(); }}>
        <input className="input" placeholder="Usuario" value={nuevo.usuario} onChange={e => setNuevo({ ...nuevo, usuario: e.target.value })} />
        <input className="input" type="password" placeholder="Contraseña" value={nuevo.password} onChange={e => setNuevo({ ...nuevo, password: e.target.value })} />
        <input type="checkbox" checked={nuevo.esAdmin} onChange={e => setNuevo({ ...nuevo, esAdmin: e.target.checked })} /> Admin
        <button className="boton" type="submit">Crear</button>
      </form>
    </AdminLayout>
  );
}

export default Usuarios;
