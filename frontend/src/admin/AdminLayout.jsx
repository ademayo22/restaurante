import React, { useState } from 'react';
import Sidebar from './Sidebar';


function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen"
       style={{ backgroundColor: "#2A2118" }}
       
       >
      <div className="flex flex-1">
        
        <Sidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        <main
          className={`flex-1 relative flex flex-col`}
        >
          {/* Fondo */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/cocina.png')" }}
          >
            <div className="absolute inset-0 bg-black opacity-50" />
          </div>

          {/* Contenido */}
          <div
            className={`relative z-10 flex-1 p-6 md:p-10 max-w-5xl mx-auto text-white
              ${sidebarOpen ? 'opacity-50 pointer-events-none' : 'opacity-100 pointer-events-auto'}
            `}
            onClick={() => sidebarOpen && setSidebarOpen(false)}
          >
            {children}
          </div>
        </main>
      </div>

   
    </div>
  );
}

export default AdminLayout;
