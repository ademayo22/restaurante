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

  const fetchPlatos = () => {
    fetch("http://localhost:5000/api/platos")
      .then((res) => res.json())
      .then(setPlatos);
  };

  useEffect(() => {
    fetchPlatos();
  }, []);

  const crearPlato = async () => {
    await fetch("http://localhost:5000/api/platos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...nuevo,
        ingredientes: nuevo.ingredientes.split(",").map((i) => i.trim()),
        alergenos: nuevo.alergenos.split(",").map((a) => a.trim()),
        precio: Number(nuevo.precio),
         imagen: nuevo.imagen
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
    fetchPlatos();
  };

  const eliminarPlato = async (id) => {
    await fetch(`http://localhost:5000/api/platos/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchPlatos();
  };

  const guardarEdicion = async () => {
    await fetch(`http://localhost:5000/api/platos/${editando._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...editando,
        ingredientes: editando.ingredientes.split(",").map((i) => i.trim()),
        alergenos: editando.alergenos.split(",").map((a) => a.trim()),
        precio: Number(editando.precio),
         imagen: editando.imagen
      }),
    });
    setEditando(null);
    fetchPlatos();
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center">ABM Platos</h2>
      {/* Listado de platos */}
      <div className="mb-8">
        <table className="w-full border text-sm bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100">
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {platos.map((plato) => (
              <tr key={plato._id} className="border-b">
                {editando && editando._id === plato._id ? (
                  <>
                    <td>
                      <input
                        className="input"
                        value={editando.imagen || ""}
                        onChange={(e) =>
                          setEditando({ ...editando, imagen: e.target.value })
                        }
                        placeholder="URL imagen"
                      />
                    </td>
                    <td>
                      <input
                        className="input"
                        value={editando.nombre || ""}
                        onChange={(e) =>
                          setEditando({ ...editando, nombre: e.target.value })
                        }
                        placeholder="Nombre"
                      />
                    </td>
                    <td>
                      <input
                        className="input"
                        value={editando.descripcion || ""}
                        onChange={(e) =>
                          setEditando({
                            ...editando,
                            descripcion: e.target.value,
                          })
                        }
                        placeholder="Descripción"
                      />
                      <input
                        className="input mt-1"
                        value={editando.ingredientes || ""}
                        onChange={(e) =>
                          setEditando({
                            ...editando,
                            ingredientes: e.target.value,
                          })
                        }
                        placeholder="Ingredientes (separados por coma)"
                      />
                      <input
                        className="input mt-1"
                        value={editando.alergenos || ""}
                        onChange={(e) =>
                          setEditando({
                            ...editando,
                            alergenos: e.target.value,
                          })
                        }
                        placeholder="Alérgenos (separados por coma)"
                      />
                    </td>
                    <td>
                      <input
                        className="input"
                        value={editando.precio || ""}
                        onChange={(e) =>
                          setEditando({ ...editando, precio: e.target.value })
                        }
                        placeholder="Precio"
                      />
                    </td>
                    <td>
                      <input
                        className="input"
                        value={editando.categoria || ""}
                        onChange={(e) =>
                          setEditando({
                            ...editando,
                            categoria: e.target.value,
                          })
                        }
                        placeholder="Categoría"
                      />
                    </td>
                    <td>
                      <button className="boton" onClick={guardarEdicion}>
                        Guardar
                      </button>
                      <button className="boton ml-2" onClick={() => setEditando(null)}>
                        Cancelar
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      {plato.imagen && (
                        <img
                          src={plato.imagen}
                          alt={plato.nombre}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </td>
                    <td>{plato.nombre}</td>
                    <td>
                      <div>{plato.descripcion}</div>
                      <div className="text-xs text-gray-600">
                        <b>Ingredientes:</b>{" "}
                        {Array.isArray(plato.ingredientes)
                          ? plato.ingredientes.join(", ")
                          : plato.ingredientes}
                      </div>
                      <div className="text-xs text-gray-600">
                        <b>Alérgenos:</b>{" "}
                        {Array.isArray(plato.alergenos)
                          ? plato.alergenos.join(", ")
                          : plato.alergenos}
                      </div>
                    </td>
                    <td>${plato.precio}</td>
                    <td>{plato.categoria}</td>
                    <td>
                      <button
                        className="boton"
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
                      >
                        Editar
                      </button>
                      <button
                        className="boton ml-2"
                        onClick={() => eliminarPlato(plato._id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Crear nuevo plato */}
      <div className="bg-white rounded shadow p-4 max-w-xl mx-auto mt-12">
        <h3 className="text-xl font-bold mb-4">Crear nuevo plato</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            crearPlato();
          }}
        >
          <input
            className="input block mb-2"
            placeholder="Nombre"
            value={nuevo.nombre || ""}
            onChange={(e) => setNuevo({ ...nuevo, nombre: e.target.value })}
          />
          <input
            className="input block mb-2"
            placeholder="Descripción"
            value={nuevo.descripcion || ""}
            onChange={(e) => setNuevo({ ...nuevo, descripcion: e.target.value })}
          />
          <input
            className="input block mb-2"
            placeholder="Ingredientes (separados por coma)"
            value={nuevo.ingredientes || ""}
            onChange={(e) => setNuevo({ ...nuevo, ingredientes: e.target.value })}
          />
          <input
            className="input block mb-2"
            placeholder="Alérgenos (separados por coma)"
            value={nuevo.alergenos || ""}
            onChange={(e) => setNuevo({ ...nuevo, alergenos: e.target.value })}
          />
          <input
            className="input block mb-2"
            placeholder="Precio"
            type="number"
            value={nuevo.precio || ""}
            onChange={(e) => setNuevo({ ...nuevo, precio: e.target.value })}
          />
          <input
            className="input block mb-2"
            placeholder="Categoría"
            value={nuevo.categoria || ""}
            onChange={(e) => setNuevo({ ...nuevo, categoria: e.target.value })}
          />
          <input
            className="input block mb-2"
            placeholder="Imagen (URL)"
            value={nuevo.imagen || ""}
            onChange={(e) => setNuevo({ ...nuevo, imagen: e.target.value })}
          />
          <button className="boton mt-2" type="submit">
            Crear
          </button>
        </form>
      </div>
    </div>
  );
}

export default Platos;
