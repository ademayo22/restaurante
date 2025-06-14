import React from "react";

function Header() {
  return (
    <header className="relative h-64 flex items-center justify-center bg-black">
      <img
        src="/images/bodegonHome.png"
        alt="Restaurante"
        className="absolute w-full h-full object-cover opacity-70"
      />
      <div className="relative z-10 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg">
          El Buen Comer
        </h1>
        <p className="text-lg md:text-2xl text-white mt-4">
          La mejor comida casera argentina
        </p>
      </div>
    </header>
  );
}

export default Header;
