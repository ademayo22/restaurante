import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-yellow-700 py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-white font-bold text-2xl tracking-wider">
          El Buen Comer
        </Link>
        <div>
          <Link
            to="/menu"
            className="text-yellow-100 hover:text-white px-4 font-semibold"
          >
            Carta
          </Link>
          <Link
            to="/#contacto"
            className="text-yellow-100 hover:text-white px-4 font-semibold"
          >
            Contacto
          </Link>
          <Link
            to="/admin/login"
            className="text-yellow-100 hover:text-white px-4 font-semibold"
          >
            Administración
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
