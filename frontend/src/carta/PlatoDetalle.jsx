import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function PlatoDetalle() {
  const { id } = useParams();
  const [plato, setPlato] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:5001/api/platos')
      .then(res => res.json())
      .then(data => {
        const found = data.find(p => p._id === id);
        setPlato(found);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50">
        <svg
          className="animate-spin h-12 w-12 text-yellow-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
      </div>
    );
  }

  if (!plato) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-yellow-50">
        <p className="text-yellow-800 text-xl font-semibold">Plato no encontrado</p>
        <Link
          to="/menu"
          className="ml-4 px-4 py-2 bg-yellow-700 text-white rounded hover:bg-yellow-800 transition"
        >
          Volver al menú
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-yellow-50 via-yellow-100 to-yellow-50 py-12 px-4">
      <div className="max-w-xl w-full bg-white rounded-xl shadow-lg p-8 transition-shadow hover:shadow-2xl">
        <div className="overflow-hidden rounded-lg mb-6 cursor-pointer group">
          <img
            src={plato.imagen}
            alt={plato.nombre}
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <h1 className="text-5xl font-extrabold mb-4 text-yellow-900">{plato.nombre}</h1>
        <p className="mb-6 text-gray-700 leading-relaxed">{plato.descripcion}</p>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Ingredientes:</span>{' '}
          {Array.isArray(plato.ingredientes)
            ? plato.ingredientes.join(', ')
            : plato.ingredientes}
        </p>
        <p className="text-gray-600 mb-6">
          <span className="font-semibold">Alérgenos:</span>{' '}
          {Array.isArray(plato.alergenos)
            ? plato.alergenos.join(', ')
            : plato.alergenos}
        </p>
        <p className="text-green-700 font-bold text-2xl mb-8">${plato.precio}</p>
        <Link
          to="/menu"
          className="inline-block px-6 py-3 bg-yellow-700 text-white rounded-full font-semibold hover:bg-yellow-800 shadow-md transition"
        >
          Volver al menú
        </Link>
      </div>
    </div>
  );
}

export default PlatoDetalle;
