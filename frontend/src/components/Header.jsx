import React from "react";

function Header() {
  return (
    <header className="relative w-full h-40 sm:h-48 md:h-64 flex items-center bg-[#2A2118]">
      {/* Imagen de fondo */}
      <img
        src="/images/bodegonHome.png"
        alt="Restaurante"
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />

      {/* Fondo marrón semitransparente detrás del texto */}
      <div className="absolute inset-0 bg-[#7D2C3E] bg-opacity-80"></div>

      {/* Contenido - texto alineado a la izquierda con padding */}
      <div className="relative z-10 px-4 sm:px-6 md:px-16 max-w-6xl w-full text-center md:text-left">
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#F5EDE0] drop-shadow-lg">
          EL BUEN COMER
        </h1>
        <p className="text-sm sm:text-md md:text-xl text-[#F5EDE0] mt-2">
          La mejor comida casera argentina
        </p>
      </div>
    </header>
  );
}

export default Header;
