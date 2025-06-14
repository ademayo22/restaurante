import React from "react";

function Footer() {
  return (
    <footer className="bg-yellow-700 text-white py-6 mt-12">
      <div className="container mx-auto px-4 text-center">
        <p className="font-bold mb-2">El Buen Comer</p>
        <p>Dirección: Av. Corrientes 1234, Buenos Aires</p>
        <p>Horario: Lunes a Dom 11:30 a 23:30</p>
        <p>Teléfono: (011) 4321-1234 &nbsp;|&nbsp; Email: hola@elbuencomer.com.ar</p>
        <p className="text-xs mt-2">&copy; 2024 El Buen Comer. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
