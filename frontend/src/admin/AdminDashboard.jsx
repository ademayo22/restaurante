import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div 
      className="min-h-screen bg-cover bg-center relative flex flex-col"
      style={{ backgroundImage: "url('/images/cocina.png')" }}
    >
      {/* Overlay oscuro */}
      <div className="absolute inset-0 bg-black opacity-50 z-0" />
      
      {/* Contenido principal */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
        {/* Tarjeta central */}
        <div className="w-full max-w-4xl bg-[#2A2118]/90 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-[#C8A97E]/30">
          {/* Header */}
          <div className="bg-[#7D2C3E] p-6 text-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-[#F5EDE0]">
              Panel de Administración
            </h1>
            <p className="text-[#F5EDE0]/80 mt-2">El Buen Comer</p>
          </div>
          
          {/* Contenido */}
          <div className="p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-serif font-semibold text-[#F5EDE0] text-center mb-8">
              Bienvenido a la Gestión
            </h2>
            
            {/* Cards de opciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Platos */}
              <div 
                className="bg-[#3A2A1F]/70 hover:bg-[#3A2A1F]/90 border border-[#C8A97E]/20 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-[#C8A97E]/40"
                onClick={() => navigate('/admin/platos')}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#7D2C3E] p-3 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F5EDE0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-[#F5EDE0] mb-2">Gestión de Platos</h3>
                  <p className="text-[#C8A97E] text-sm">Administra el menú del restaurante</p>
                </div>
              </div>
              
              {/* Card Usuarios */}
              <div 
                className="bg-[#3A2A1F]/70 hover:bg-[#3A2A1F]/90 border border-[#C8A97E]/20 rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-[#C8A97E]/40"
                onClick={() => navigate('/admin/usuarios')}
              >
                <div className="flex flex-col items-center text-center">
                  <div className="bg-[#7D2C3E] p-3 rounded-full mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-[#F5EDE0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-[#F5EDE0] mb-2">Gestión de Usuarios</h3>
                  <p className="text-[#C8A97E] text-sm">Administra usuarios y permisos</p>
                </div>
              </div>
            </div>
            
            {/* Mensaje de bienvenida */}
            <div className="mt-12 text-center">
              <p className="text-[#F5EDE0]/80 italic">Selecciona una opción para comenzar</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;