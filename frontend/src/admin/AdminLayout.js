import React, { useState } from 'react';
import Sidebar from './Sidebar';

function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div
      className="flex min-h-screen bg-cover bg-center relative"
      style={{ backgroundImage: "url('/images/cocina.png')" }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0" />

      {/* Sidebar para desktop y móvil */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <main
        className={`flex-1 p-6 md:p-10 max-w-5xl mx-auto text-white relative z-10
          ${sidebarOpen ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto'}
        `}
        onClick={() => sidebarOpen && setSidebarOpen(false)} // Cierra sidebar si clic fuera (en móvil)
      >
        {children}
      </main>
    </div>
  );
}

export default AdminLayout;
