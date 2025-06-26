import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { LogOut, User, Edit2, Menu } from "lucide-react";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Botón hamburguesa para móviles */}
      <button
        className="fixed top-4 left-4 z-20 md:hidden bg-[#7D2C3E] text-[#F5EDE0] p-2 rounded-md shadow-md"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Abrir/cerrar menú lateral"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-10 h-full w-64 p-6 bg-[#2A2118] shadow-lg
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:flex md:flex-col md:min-h-screen
        `}
      >
        <h2 className="text-3xl font-extrabold mb-10 text-center tracking-widest text-[#F5EDE0]">
          El Buen Comer
        </h2>

        <nav className="flex-1 flex flex-col space-y-4">
          <Link
            to="/admin/platos"
            className={`flex items-center gap-3 px-5 py-3 rounded-lg font-semibold transition-colors duration-300 ${
              isActive("/admin/platos")
                ? "bg-[#7D2C3E] text-white"
                : "bg-[#C8A97E] text-[#2A2118] hover:bg-[#C8A97E] hover:text-[#2A2118]"
            }`}
            onClick={() => setSidebarOpen(false)} // Cierra menú al elegir en móvil
          >
            <Edit2 size={20} />
            Platos
          </Link>

          <Link
            to="/admin/usuarios"
            className={`flex items-center gap-3 px-5 py-3 rounded-lg font-semibold transition-colors duration-300 ${
              isActive("/admin/usuarios")
                ? "bg-[#7D2C3E] text-white"
                : "bg-[#C8A97E] text-[#2A2118] hover:bg-[#C8A97E] hover:text-[#2A2118]"
            }`}
            onClick={() => setSidebarOpen(false)}
          >
            <User size={20} />
            Usuarios
          </Link>
        </nav>

        <button
          onClick={() => {
            logout();
            setSidebarOpen(false);
          }}
          className="mt-auto flex items-center gap-3 px-5 py-3 bg-[#A83232] hover:bg-[#7A1F1F] rounded-lg font-semibold transition text-[#F5EDE0]"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </aside>

      {/* Fondo semi-transparente detrás de sidebar en móvil cuando está abierto */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-5 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}

export default Sidebar;
