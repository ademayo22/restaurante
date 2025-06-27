import React from "react";
import Footer from "./Footer.jsx";  // O la ruta donde lo tengas

function BackgroundLayout({ children }) {
  return (
    <div className="relative w-full min-h-screen flex flex-col">
      <img
        src="/images/bodegonHome.png"
        alt="Fondo bodegón"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
      <div className="fixed inset-0 bg-black opacity-70 z-10"></div>

      <main className="flex-grow relative z-10 w-full px-6 py-8 overflow-auto">
        {children}
      </main>

      <Footer className="relative z-10" />
    </div>
  );
}

export default BackgroundLayout;
