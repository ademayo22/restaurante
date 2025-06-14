import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 justify-center">
      <img
        src="/images/bodegonHome.png"
        alt="Bodegón"
        className="w-full max-w-2xl rounded-xl shadow-lg mb-8"
      />
      <h1 className="text-4xl font-extrabold text-yellow-900 mb-4">Bienvenido a El Buen Comer</h1>
      <p className="text-lg mb-8 text-gray-700">
        La mejor comida casera argentina en el corazón del barrio.
      </p>
      <Link
        to="/menu"
        className="px-6 py-3 bg-yellow-700 text-white rounded-lg shadow-lg font-bold text-xl hover:bg-yellow-800 transition"
      >
        Ver nuestra carta
      </Link>
    </div>
  );
}

export default Home;
