import React, { useEffect, useState } from 'react';
import Plato from '../components/Plato';
import { Link } from 'react-router-dom';

function Menu() {
  const [platos, setPlatos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todas');

  useEffect(() => {
    fetch('http://localhost:5000/api/platos')
      .then(res => res.json())
      .then(data => setPlatos(data));
  }, []);

  // Sacar las categorías únicas de los platos
  const categorias = [
    'Todas',
    ...Array.from(new Set(platos.map(plato => plato.categoria)))
  ];

  // Filtrar los platos por categoría
  const platosFiltrados =
    categoriaSeleccionada === 'Todas'
      ? platos
      : platos.filter(plato => plato.categoria === categoriaSeleccionada);

  // Agrupar platos por categoría para mostrar igual que tu menu.js
  const agrupadosPorCategoria = {};
  platosFiltrados.forEach(plato => {
    if (!agrupadosPorCategoria[plato.categoria]) {
      agrupadosPorCategoria[plato.categoria] = [];
    }
    agrupadosPorCategoria[plato.categoria].push(plato);
  });

   return (
    <div className="min-h-screen bg-gray-100 pb-12">
      <div className="max-w-4xl mx-auto pt-8">
        <div className="flex flex-wrap justify-center mb-8">
          {categorias.map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 m-2 rounded ${
                categoriaSeleccionada === cat
                  ? 'bg-yellow-700 text-white'
                  : 'bg-yellow-200 text-yellow-900'
              } font-bold shadow`}
              onClick={() => setCategoriaSeleccionada(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        {Object.keys(agrupadosPorCategoria).map(cat => (
          <div key={cat} className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-900">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agrupadosPorCategoria[cat].map(plato => (
                <Link
                  to={`/plato/${plato._id}`}
                  key={plato._id}
                  className="block hover:scale-105 transition-transform"
                >
                  <Plato {...plato} />
                </Link>
              ))}
            </div>
          </div>
        ))}
        {platosFiltrados.length === 0 && (
          <div className="text-center mt-8 text-gray-600">
            No hay platos disponibles en esta categoría.
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;