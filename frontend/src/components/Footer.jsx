import React from "react";

function Footer() {
  return (
    <footer id="footer-contact" className="bg-[#2A2118] text-[#F5EDE0] py-8 shadow-inner">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Sección de Contacto destacada */}
        <div className="text-center mb-6">
        <h2 className="text-xl font-serif font-bold mb-4 text-[#F5EDE0]">Contacto</h2>
        </div>
        
        {/* Información existente */}
        <div className="text-center space-y-2">
          <p className="font-bold text-lg sm:text-xl">El Buen Comer</p>
          <p className="text-sm sm:text-base">Av. Corrientes 1234, Buenos Aires</p>
          <p className="text-sm sm:text-base">Horario: Lunes a Dom 11:30 a 23:30</p>
          <p className="text-sm sm:text-base">
            Teléfono:{" "}
            <a href="tel:+01143211234" className="underline hover:text-[#7D2C3E]">
              (011) 4321-1234
            </a>{" "}
            &nbsp;|&nbsp;{" "}
            <a href="mailto:hola@elbuencomer.com.ar" className="underline hover:text-[#7D2C3E]">
              hola@elbuencomer.com.ar
            </a>
          </p>
          <p className="text-xs text-[#BFAF95] mt-4">&copy; 2024 El Buen Comer. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;