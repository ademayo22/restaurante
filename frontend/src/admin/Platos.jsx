import React, { useEffect, useState } from "react";

function Platos() {
  const token = localStorage.getItem("token");
  const [platos, setPlatos] = useState([]);
  const [nuevo, setNuevo] = useState({
    nombre: "",
    descripcion: "",
    ingredientes: "",
    alergenos: "",
    precio: "",
    categoria: "",
    imagen: "",
  });
  const [editando, setEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchPlatos = () => {
    fetch("http://localhost:5001/api/platos")
      .then((res) => res.json())
      .then(setPlatos);
  };

  useEffect(() => {
    fetchPlatos();
  }, []);

  const formatearPrecio = (precio) => {
    if (!precio && precio !== 0) return "";
    return precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" });
  };

  const crearPlato = async () => {
    if (!nuevo.nombre || !nuevo.precio || isNaN(nuevo.precio)) {
      setMensaje("Por favor, completa nombre y precio válido.");
      return;
    }
    setMensaje("");
    await fetch("http://localhost:5001/api/platos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...nuevo,
        ingredientes: nuevo.ingredientes
          .split(",")
          .map((i) => i.trim())
          .filter((i) => i),
        alergenos: nuevo.alergenos
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a),
        precio: Number(nuevo.precio),
      }),
    });
    setNuevo({
      nombre: "",
      descripcion: "",
      ingredientes: "",
      alergenos: "",
      precio: "",
      categoria: "",
      imagen: "",
    });
    setMensaje("Plato creado con éxito!");
    fetchPlatos();
  };

  const eliminarPlato = async (id) => {
    await fetch(`http://localhost:5001/api/platos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    setMensaje("Plato eliminado.");
    fetchPlatos();
  };

  const guardarEdicion = async () => {
    if (!editando.nombre || !editando.precio || isNaN(editando.precio)) {
      setMensaje("Completa nombre y precio válido para editar.");
      return;
    }
    setMensaje("");
    await fetch(`http://localhost:5001/api/platos/${editando._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...editando,
        ingredientes: editando.ingredientes
          .split(",")
          .map((i) => i.trim())
          .filter((i) => i),
        alergenos: editando.alergenos
          .split(",")
          .map((a) => a.trim())
          .filter((a) => a),
        precio: Number(editando.precio),
      }),
    });
    setEditando(null);
    setMensaje("Plato editado con éxito!");
    fetchPlatos();
  };

  return (
    <div className="px-4 py-8 bg-[#F5EDE0] min-h-screen">
      <h2 className="text-2xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-[#7D2C3E]">
        Gestión de Platos
      </h2>

      {mensaje && (
        <div className={`max-w-4xl mx-auto mb-4 md:mb-6 text-center text-sm md:text-base ${
          mensaje.includes("éxito") ? "text-[#3A7D44]" : "text-[#A83232]"
        } font-semibold bg-white p-3 rounded-lg shadow`}>
          {mensaje}
        </div>
      )}

      {/* Tabla de platos - Desktop */}
      {!isMobile && (
        <div className="overflow-x-auto max-w-7xl mx-auto mb-8 md:mb-12">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-[#7D2C3E] text-[#F5EDE0]">
                <th className="py-3 px-4 text-left">Imagen</th>
                <th className="py-3 px-4 text-left">Nombre</th>
                <th className="py-3 px-4 text-left">Descripción</th>
                <th className="py-3 px-4 text-left">Precio</th>
                <th className="py-3 px-4 text-left">Categoría</th>
                <th className="py-3 px-4 text-left">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {platos.map((plato, i) => (
                <tr
                  key={plato._id}
                  className={`border-b ${i % 2 === 0 ? "bg-white" : "bg-[#F5EDE0]"} hover:bg-[#E8D9C5]`}
                >
                  {editando && editando._id === plato._id ? (
                    <>
                      <td className="py-2 px-4">
                        <input
                          className="w-full md:w-24 border rounded px-2 py-1 text-[#2A2118] border-[#C8A97E] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E]"
                          value={editando.imagen || ""}
                          onChange={(e) =>
                            setEditando({ ...editando, imagen: e.target.value })
                          }
                          placeholder="URL imagen"
                        />
                        {editando.imagen && (
                          <img
                            src={editando.imagen}
                            alt="Preview"
                            className="mt-1 w-24 h-16 object-cover rounded border border-[#C8A97E]"
                          />
                        )}
                      </td>
                      <td className="py-2 px-4">
                        <input
                          className="w-full border rounded px-2 py-1 text-[#2A2118] border-[#C8A97E] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E]"
                          value={editando.nombre || ""}
                          onChange={(e) =>
                            setEditando({ ...editando, nombre: e.target.value })
                          }
                          placeholder="Nombre"
                        />
                      </td>
                      <td className="py-2 px-4 space-y-2">
                        <textarea
                          className="w-full border rounded px-2 py-1 resize-none text-[#2A2118] border-[#C8A97E] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E]"
                          rows={2}
                          value={editando.descripcion || ""}
                          onChange={(e) =>
                            setEditando({ ...editando, descripcion: e.target.value })
                          }
                          placeholder="Descripción"
                        />
                        <textarea
                          className="w-full border rounded px-2 py-1 resize-none text-[#2A2118] border-[#C8A97E] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E]"
                          rows={2}
                          value={editando.ingredientes || ""}
                          onChange={(e) =>
                            setEditando({ ...editando, ingredientes: e.target.value })
                          }
                          placeholder="Ingredientes (separados por coma)"
                        />
                        <textarea
                          className="w-full border rounded px-2 py-1 resize-none text-[#2A2118] border-[#C8A97E] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E]"
                          rows={1}
                          value={editando.alergenos || ""}
                          onChange={(e) =>
                            setEditando({ ...editando, alergenos: e.target.value })
                          }
                          placeholder="Alérgenos (separados por coma)"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          className="w-full border rounded px-2 py-1 text-[#2A2118] border-[#C8A97E] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E]"
                          value={editando.precio || ""}
                          onChange={(e) =>
                            setEditando({ ...editando, precio: e.target.value })
                          }
                          placeholder="Precio"
                        />
                      </td>
                      <td className="py-2 px-4">
                        <select
                          className="w-full border rounded px-2 py-1 bg-white text-[#2A2118] border-[#C8A97E] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E]"
                          value={editando.categoria || ""}
                          onChange={(e) =>
                            setEditando({ ...editando, categoria: e.target.value })
                          }
                        >
                          <option value="">Seleccione categoría</option>
                          <option value="Carnes">Carnes</option>
                          <option value="Pescados">Pescados</option>
                          <option value="Pastas">Pastas</option>
                          <option value="Postres">Postres</option>
                          <option value="Bebidas">Bebidas</option>
                        </select>
                      </td>
                      <td className="py-2 px-4 flex gap-2">
                        <button
                          onClick={guardarEdicion}
                          className="bg-[#3A7D44] hover:bg-[#2C5B31] text-white px-3 py-1 rounded text-sm md:text-base"
                        >
                          Guardar
                        </button>
                        <button
                          onClick={() => setEditando(null)}
                          className="bg-[#C8A97E] hover:bg-[#A68D66] text-[#2A2118] px-3 py-1 rounded text-sm md:text-base"
                        >
                          Cancelar
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-2 px-4">
                        {plato.imagen && (
                          <img
                            src={plato.imagen}
                            alt={plato.nombre}
                            className="w-20 h-16 object-cover rounded border border-[#C8A97E]"
                          />
                        )}
                      </td>
                      <td className="py-2 px-4 font-semibold text-[#2A2118]">{plato.nombre}</td>
                      <td className="py-2 px-4 space-y-1 text-[#2A2118]">
                        <div className="text-sm">{plato.descripcion}</div>
                        <div className="text-xs text-[#7D2C3E]">
                          <b>Ingredientes:</b>{" "}
                          {(Array.isArray(plato.ingredientes)
                            ? plato.ingredientes
                            : []
                          ).map((ing, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-[#C8A97E] text-[#2A2118] rounded-full px-2 py-0.5 mr-1 mb-1 text-xs"
                            >
                              {ing}
                            </span>
                          ))}
                        </div>
                        <div className="text-xs text-[#A83232]">
                          <b>Alérgenos:</b>{" "}
                          {(Array.isArray(plato.alergenos)
                            ? plato.alergenos
                            : []
                          ).map((alg, idx) => (
                            <span
                              key={idx}
                              className="inline-block bg-[#A83232] bg-opacity-20 text-[#A83232] rounded-full px-2 py-0.5 mr-1 text-xs"
                            >
                              {alg}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-2 px-4 font-mono text-[#7D2C3E]">{formatearPrecio(plato.precio)}</td>
                      <td className="py-2 px-4">
                        {plato.categoria && (
                          <span className="bg-[#C8A97E] text-[#7D2C3E] px-2 py-1 rounded font-semibold text-xs uppercase">
                            {plato.categoria}
                          </span>
                        )}
                      </td>
                      <td className="py-2 px-4 flex gap-2">
                        <button
                          onClick={() =>
                            setEditando({
                              ...plato,
                              ingredientes: Array.isArray(plato.ingredientes)
                                ? plato.ingredientes.join(", ")
                                : plato.ingredientes,
                              alergenos: Array.isArray(plato.alergenos)
                                ? plato.alergenos.join(", ")
                                : plato.alergenos,
                            })
                          }
                          className="text-[#7D2C3E] hover:text-[#631E2B]"
                          title="Editar"
                          aria-label="Editar plato"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 md:h-6 md:w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M11 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-5M18.5 6.5L13 12l-3 3 6.5-6.5z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => eliminarPlato(plato._id)}
                          className="text-[#A83232] hover:text-[#7D2C3E]"
                          title="Eliminar"
                          aria-label="Eliminar plato"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 md:h-6 md:w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 011-1h2a1 1 0 011 1m-4 0h4"
                            />
                          </svg>
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Lista de platos - Mobile */}
      {isMobile && (
        <div className="mb-8 space-y-4">
          {platos.map((plato) => (
            <div key={plato._id} className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-[#7D2C3E]">{plato.nombre}</h3>
                  <p className="text-sm text-[#2A2118] mt-1">{plato.descripcion}</p>
                  <div className="mt-2">
                    <span className="bg-[#C8A97E] text-[#7D2C3E] px-2 py-1 rounded font-semibold text-xs uppercase">
                      {plato.categoria}
                    </span>
                    <span className="ml-2 font-mono text-[#7D2C3E]">
                      {formatearPrecio(plato.precio)}
                    </span>
                  </div>
                </div>
                {plato.imagen && (
                  <img
                    src={plato.imagen}
                    alt={plato.nombre}
                    className="w-16 h-16 object-cover rounded border border-[#C8A97E]"
                  />
                )}
              </div>
              
              <div className="mt-2 text-xs text-[#7D2C3E]">
                <b>Ingredientes:</b>{" "}
                {(Array.isArray(plato.ingredientes)
                  ? plato.ingredientes
                  : []
                ).map((ing, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-[#C8A97E] text-[#2A2118] rounded-full px-2 py-0.5 mr-1 mb-1 text-xs"
                  >
                    {ing}
                  </span>
                ))}
              </div>
              
              <div className="mt-1 text-xs text-[#A83232]">
                <b>Alérgenos:</b>{" "}
                {(Array.isArray(plato.alergenos)
                  ? plato.alergenos
                  : []
                ).map((alg, idx) => (
                  <span
                    key={idx}
                    className="inline-block bg-[#A83232] bg-opacity-20 text-[#A83232] rounded-full px-2 py-0.5 mr-1 text-xs"
                  >
                    {alg}
                  </span>
                ))}
              </div>
              
              <div className="flex justify-end mt-3 space-x-2">
                <button
                  onClick={() =>
                    setEditando({
                      ...plato,
                      ingredientes: Array.isArray(plato.ingredientes)
                        ? plato.ingredientes.join(", ")
                        : plato.ingredientes,
                      alergenos: Array.isArray(plato.alergenos)
                        ? plato.alergenos.join(", ")
                        : plato.alergenos,
                    })
                  }
                  className="text-[#7D2C3E] hover:text-[#631E2B] p-1"
                  title="Editar"
                  aria-label="Editar plato"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-5M18.5 6.5L13 12l-3 3 6.5-6.5z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => eliminarPlato(plato._id)}
                  className="text-[#A83232] hover:text-[#7D2C3E] p-1"
                  title="Eliminar"
                  aria-label="Eliminar plato"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5-4h4m-4 0a1 1 0 011-1h2a1 1 0 011 1m-4 0h4"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Formulario creación nuevo plato */}
      <div className="max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6 text-[#7D2C3E] text-center">
          Crear nuevo plato
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            crearPlato();
          }}
          className="space-y-4"
        >
          <div>
            <label className="block font-semibold mb-1 text-sm md:text-base text-[#2A2118]" htmlFor="nombre">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              className="w-full border border-[#7D2C3E] rounded px-3 py-2 text-[#2A2118] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E] text-sm md:text-base"
              placeholder="Nombre del plato"
              value={nuevo.nombre}
              onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
              required
            />
          </div>

          <div>
            <label
              className="block font-semibold mb-1 text-sm md:text-base text-[#2A2118]"
              htmlFor="descripcion"
            >
              Descripción
            </label>
            <textarea
              id="descripcion"
              rows="2"
              className="w-full border border-[#7D2C3E] rounded px-3 py-2 resize-none text-[#2A2118] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E] text-sm md:text-base"
              placeholder="Descripción del plato"
              value={nuevo.descripcion}
              onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })}
            />
          </div>

          <div>
            <label
              className="block font-semibold mb-1 text-sm md:text-base text-[#2A2118]"
              htmlFor="ingredientes"
            >
              Ingredientes (separados por coma)
            </label>
            <textarea
              id="ingredientes"
              rows="2"
              className="w-full border border-[#7D2C3E] rounded px-3 py-2 resize-none text-[#2A2118] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E] text-sm md:text-base"
              placeholder="Ej: Tomate, Queso, Albahaca"
              value={nuevo.ingredientes}
              onChange={(e) => setNuevo({ ...nuevo, ingredientes: e.target.value })}
            />
          </div>

          <div>
            <label
              className="block font-semibold mb-1 text-sm md:text-base text-[#2A2118]"
              htmlFor="alergenos"
            >
              Alérgenos (separados por coma)
            </label>
            <textarea
              id="alergenos"
              rows="1"
              className="w-full border border-[#7D2C3E] rounded px-3 py-2 resize-none text-[#2A2118] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E] text-sm md:text-base"
              placeholder="Ej: Gluten, Lactosa"
              value={nuevo.alergenos}
              onChange={(e) => setNuevo({ ...nuevo, alergenos: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-sm md:text-base text-[#2A2118]" htmlFor="precio">
                Precio
              </label>
              <input
                id="precio"
                type="number"
                min="0"
                step="0.01"
                className="w-full border border-[#7D2C3E] rounded px-3 py-2 text-[#2A2118] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E] text-sm md:text-base"
                placeholder="Precio"
                value={nuevo.precio}
                onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-sm md:text-base text-[#2A2118]" htmlFor="categoria">
                Categoría
              </label>
              <select
                id="categoria"
                className="w-full border border-[#7D2C3E] rounded px-3 py-2 bg-white text-[#2A2118] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E] text-sm md:text-base"
                value={nuevo.categoria}
                onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })}
              >
                <option value="">Seleccione categoría</option>
                <option value="Carnes">Carnes</option>
                <option value="Pescados">Pescados</option>
                <option value="Pastas">Pastas</option>
                <option value="Postres">Postres</option>
                <option value="Bebidas">Bebidas</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1 text-sm md:text-base text-[#2A2118]" htmlFor="imagen">
              URL Imagen
            </label>
            <input
              id="imagen"
              type="text"
              className="w-full border border-[#7D2C3E] rounded px-3 py-2 text-[#2A2118] focus:outline-none focus:ring-2 focus:ring-[#7D2C3E] text-sm md:text-base"
              placeholder="URL de la imagen"
              value={nuevo.imagen}
              onChange={(e) => setNuevo({ ...nuevo, imagen: e.target.value })}
            />
            {nuevo.imagen && (
              <img
                src={nuevo.imagen}
                alt="Preview"
                className="mt-2 w-full md:w-48 h-32 object-cover rounded border border-[#C8A97E]"
              />
            )}
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-[#7D2C3E] hover:bg-[#631E2B] text-[#F5EDE0] font-bold py-2 md:py-3 rounded transition text-sm md:text-base"
          >
            Crear Plato
          </button>
        </form>
      </div>
    </div>
  );
}

export default Platos;