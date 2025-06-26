import React from "react";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center text-white overflow-hidden">
      <img
        src="/images/bodegonHome.png"
        alt="Bodegón argentino"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="relative z-10 text-center px-4 sm:px-6">
        <div className="bg-black bg-opacity-60 p-5 sm:p-8 rounded-md inline-block max-w-2xl mx-auto w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Sabores tradicionales
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-6">
            Disfrutá de la mejor comida casera en un ambiente familiar
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="#reserva"
              className="bg-[#7D2C3E] hover:bg-[#7f1515] text-white font-semibold py-3 px-6 rounded transition w-full sm:w-auto text-center"
            >
              Reservar mesa
            </a>
            <Link
              to="/menu"
              className="border border-white hover:bg-white hover:text-[#9B1B1B] text-white font-semibold py-3 px-6 rounded transition w-full sm:w-auto text-center"
            >
              Ver menú
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
