import React, { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';

function Platos() {
  const token = localStorage.getItem('token');
  const [platos, setPlatos] = useState([]);
  const [nuevo, setNuevo] = useState({ nombre: '', descripcion: '', precio: '', categoria: '' });
  const [editando, setEditando] = useState(null);

  const fetchPlatos = () => {
    fetch('http://localhost:5000/api/platos')
      .then(res => res.json())
      .then(setPlatos);
  };

  useEffect(() => {
    fetchPlatos();
  }, []);

  const crearPlato = async () => {
    await fetch('http://localhost:5000/api/platos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(nuevo),
    });
    setNuevo({ nombre: '', descripcion: '', precio: '', categoria: '' });
    fetchPlatos();
  };

  const eliminarPlato = async (id) => {
    await fetch(`http://localhost:5000/api/platos/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` },
    });
    fetchPlatos();
  };

  const guardarEdicion = async () => {
    await fetch(`http://localhost:5000/api/platos/${editando._id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
      body: JSON.stringify(editando),
    });
    setEditando(null);
    fetchPlatos();
  };

  return (
    <AdminLayout>
      <h3 className="titulo">Platos del Menú</h3>
      <ul className="lista">
        {platos.map(plato => (
          <li key={plato._id} className="item-lista">
            {editando && editando._id === plato._id ? (
              <>
                <input className="input" value={editando.nombre} onChange={e => setEditando({ ...editando, nombre: e.target.value })} />
                <input className="input" value={editando.descripcion} onChange={e => setEditando({ ...editando, descripcion: e.target.value })} />
                <input className="input" value={editando.precio} onChange={e => setEditando({ ...editando, precio: e.target.value })} />
                <input className="input" value={editando.categoria} onChange={e => setEditando({ ...editando, categoria: e.target.value })} />
                <button className="boton" onClick={guardarEdicion}>Guardar</button>
                <button className="boton" onClick={() => setEditando(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <b>{plato.nombre}</b> ({plato.categoria}) - ${plato.precio}
                <br />
                {plato.descripcion}
                <button className="boton" onClick={() => setEditando(plato)}>Editar</button>
                <button className="boton" onClick={() => eliminarPlato(plato._id)}>Eliminar</button>
              </>
            )}
          </li>
        ))}
      </ul>
      <h4>Crear nuevo plato</h4>
      <form onSubmit={e => { e.preventDefault(); crearPlato(); }}>
        <input className="input" placeholder="Nombre" value={nuevo.nombre} onChange={e => setNuevo({ ...nuevo, nombre: e.target.value })} />
        <input className="input" placeholder="Descripción" value={nuevo.descripcion} onChange={e => setNuevo({ ...nuevo, descripcion: e.target.value })} />
        <input className="input" placeholder="Precio" value={nuevo.precio} onChange={e => setNuevo({ ...nuevo, precio: e.target.value })} />
        <input className="input" placeholder="Categoría" value={nuevo.categoria} onChange={e => setNuevo({ ...nuevo, categoria: e.target.value })} />
        <button className="boton" type="submit">Crear</button>
      </form>
    </AdminLayout>
  );
}

export default Platos;
