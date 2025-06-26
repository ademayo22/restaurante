import React from 'react';

function Plato({ nombre, descripcion, ingredientes, alergenos, precio, imagen }) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 cursor-pointer overflow-hidden flex flex-col">
      <div className="overflow-hidden rounded-t-xl">
        <img
          src={imagen}
          alt={nombre}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-2xl font-extrabold mb-2 text-yellow-900">{nombre}</h3>
        <p className="text-gray-700 mb-3 flex-grow">{descripcion}</p>
        <p className="text-gray-600 text-sm mb-1">
          <span className="font-semibold">Ingredientes:</span>{' '}
          {Array.isArray(ingredientes) ? ingredientes.join(', ') : ingredientes}
        </p>
        <p className="text-gray-600 text-sm mb-3">
          <span className="font-semibold">Alérgenos:</span>{' '}
          {Array.isArray(alergenos) ? alergenos.join(', ') : alergenos}
        </p>
        <p className="text-green-700 font-bold text-xl">${precio}</p>
      </div>
    </div>
  );
}

export default Plato;
