import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const { pathname } = useLocation();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const scrollToFooter = () => {
    const footer = document.getElementById('footer-contact');
    footer?.scrollIntoView({ behavior: 'smooth' });
    setMenuAbierto(false);
  };

  return (
    <nav className="bg-[#2A2118] py-4 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6">
        <Link
          to="/"
          className="bg-[#7D2C3E] text-[#F5EDE0] font-extrabold text-2xl tracking-widest px-5 py-2 rounded-lg transition-opacity duration-300 hover:opacity-90"
          onClick={() => setMenuAbierto(false)}
        >
          El Buen Comer
        </Link>

        <button
          className="sm:hidden text-[#F5EDE0] focus:outline-none"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir menú"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {menuAbierto ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <div
          className={`flex-col sm:flex-row sm:flex items-center gap-6 w-full sm:w-auto mt-4 sm:mt-0 bg-[#2A2118] sm:bg-transparent rounded-lg sm:rounded-none shadow-md sm:shadow-none transition-all duration-300 ease-in-out ${
            menuAbierto ? "flex" : "hidden"
          }`}
        >
          <Link
            to="/menu"
            className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-opacity duration-300 hover:opacity-90 block text-center sm:inline-block ${
              pathname === "/menu" ? "bg-[#B38B59]" : "bg-[#7D2C3E]"
            } text-[#F5EDE0]`}
            onClick={() => setMenuAbierto(false)}
          >
            Carta
          </Link>
          <button
            onClick={scrollToFooter}
            className="bg-[#7D2C3E] text-[#F5EDE0] px-4 py-2 rounded-lg font-semibold shadow-md transition-opacity duration-300 hover:opacity-90 block text-center sm:inline-block"
          >
            Contacto
          </button>
          <Link
            to="/admin/login"
                className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-opacity duration-300 hover:opacity-90 block text-center sm:inline-block ${
                pathname.startsWith("/admin") ? "bg-[#B38B59]" : "bg-[#7D2C3E]"
                      } text-[#F5EDE0]`}
                      onClick={() => setMenuAbierto(false)}
                                >
  Administración
</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
