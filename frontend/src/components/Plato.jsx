import React from 'react';

function Plato({ nombre, descripcion, ingredientes, alergenos, precio, imagen }) {
  return (
    <div className="rounded-lg overflow-hidden shadow-lg bg-white">
      <img src={imagen} alt={nombre} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{nombre}</h3>
        <p className="text-gray-700 mb-2">{descripcion}</p>
        <p className="text-gray-500 text-sm mb-2">
          <span className="font-semibold">Ingredientes:</span> {Array.isArray(ingredientes) ? ingredientes.join(', ') : ingredientes}
        </p>
        <p className="text-gray-500 text-sm mb-2">
          <span className="font-semibold">Alérgenos:</span> {Array.isArray(alergenos) ? alergenos.join(', ') : alergenos}
        </p>
        <p className="text-green-700 font-bold text-lg">${precio}</p>
      </div>
    </div>
  );
}

export default Plato;
