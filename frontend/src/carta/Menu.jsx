import React, { useEffect, useState } from "react";
import Plato from "../components/Plato";
import { Link } from "react-router-dom";

function Menu() {
  const [platos, setPlatos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todas");

  useEffect(() => {
    fetch("http://localhost:5001/api/platos")
      .then((res) => res.json())
      .then((data) => setPlatos(data));
  }, []);

  const categorias = [
    "Todas",
    ...Array.from(new Set(platos.map((plato) => plato.categoria))),
  ];

  const platosFiltrados =
    categoriaSeleccionada === "Todas"
      ? platos
      : platos.filter((plato) => plato.categoria === categoriaSeleccionada);

  const agrupadosPorCategoria = {};
  platosFiltrados.forEach((plato) => {
    if (!agrupadosPorCategoria[plato.categoria]) {
      agrupadosPorCategoria[plato.categoria] = [];
    }
    agrupadosPorCategoria[plato.categoria].push(plato);
  });

  return (
    <div className="min-h-screen bg-gray-100 pb-12">
      <div className="max-w-5xl mx-auto pt-8 px-4 sm:px-6 md:px-8">
        {/* Botones de filtro por categoría */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`px-6 py-3 rounded-full font-semibold transition-colors duration-300 shadow-md ${
                categoriaSeleccionada === cat
                  ? "bg-[#7D2C3E] text-white"
                  : "bg-[#C8A97E] hover:bg-[#C8A97E] hover:text-[#2A2118]"
              }`}
              onClick={() => setCategoriaSeleccionada(cat)}
              aria-label={`Filtrar por categoría ${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Platos agrupados por categoría */}
        {Object.keys(agrupadosPorCategoria).map((cat) => (
          <div key={cat} className="mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-[#5E1224] border-b-4 border-[#B38B59] pb-2">
              {cat}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {agrupadosPorCategoria[cat].map((plato) => (
                <Link
                  to={`/plato/${plato._id}`}
                  key={plato._id}
                  className="block transform hover:scale-105 transition-transform"
                  aria-label={`Ver detalles del plato ${plato.nombre}`}
                >
                  <Plato {...plato} />
                </Link>
              ))}
            </div>
          </div>
        ))}

        {platosFiltrados.length === 0 && (
          <div className="text-center mt-12 text-gray-600 text-lg">
            No hay platos disponibles en esta categoría.
          </div>
        )}
      </div>
    </div>
  );
}

export default Menu;
