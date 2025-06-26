import React from "react";
import Footer from "./Footer";

function BackgroundLayout({ children }) {
  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col">
      <img
        src="/images/bodegonHome.png"
        alt="Fondo bodegón"
        className="fixed inset-0 w-full h-full object-cover z-0"
      />
      <div className="fixed inset-0 bg-black opacity-70 z-10"></div>


      <main className="flex-grow overflow-auto relative z-10 w-full px-6">
          {children}
        </main>

    

      <Footer />
    </div>
  );
}

export default BackgroundLayout;