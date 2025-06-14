import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function PlatoDetalle() {
  const { id } = useParams();
  const [plato, setPlato] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/platos')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p._id === id);
        setPlato(found);
      });
  }, [id]);

  if (!plato) return <div className="text-center py-16">Cargando...</div>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 pb-12 pt-8">
      <div className="max-w-xl w-full bg-white rounded-lg shadow-lg p-8">
        <img
          src={plato.imagen}
          alt={plato.nombre}
          className="w-full h-64 object-cover rounded mb-6"
        />
        <h1 className="text-3xl font-bold mb-4 text-yellow-900">{plato.nombre}</h1>
        <p className="mb-4">{plato.descripcion}</p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Ingredientes:</span>{" "}
          {Array.isArray(plato.ingredientes)
            ? plato.ingredientes.join(", ")
            : plato.ingredientes}
        </p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Alérgenos:</span>{" "}
          {Array.isArray(plato.alergenos)
            ? plato.alergenos.join(", ")
            : plato.alergenos}
        </p>
        <p className="text-green-700 font-bold text-lg mb-4">${plato.precio}</p>
        <Link
          to="/menu"
          className="px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 transition"
        >
          Volver al menú
        </Link>
      </div>
    </div>
  );
}

export default PlatoDetalle;
