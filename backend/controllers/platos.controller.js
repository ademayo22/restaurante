const fs = require("fs");
const path = require("path");
const Plato = require("../models/Plato.model");

// Crear un plato
exports.crear = async (req, res) => {
  console.log("REQ BODY crear:", req.body);
  const plato = new Plato(req.body);
  await plato.save();
  res.status(201).json(plato);
};

// Listar platos activos o sin campo activo (legacy)
exports.listar = async (req, res) => {
  const { categoria } = req.query;
  const query = {
    $or: [
      { activo: { $exists: false } },
      { activo: true }
    ]
  };
  if (categoria) query.categoria = categoria;
  
  const platos = await Plato.find(query);
  res.json(platos);
};

// Modificar plato
exports.modificar = async (req, res) => {
  console.log("REQ BODY MODIFICAR:", req.body);
  const { id } = req.params;
  const plato = await Plato.findByIdAndUpdate(id, req.body, { new: true });
  res.json(plato);
};

// Eliminar lógico + log en CSV
exports.eliminar = async (req, res) => {
  const { id } = req.params;
  const userName = req.user?.usuario || "desconocido";

  const plato = await Plato.findByIdAndUpdate(id, { activo: false }, { new: true });

  if (plato) {
    const logPath = path.join(__dirname, "../logs/eliminaciones.csv");
    const linea = `${userName},Plato eliminado,${plato.nombre},${new Date().toISOString()}\n`;
    
    fs.appendFile(logPath, linea, (err) => {
      if (err) console.error("Error escribiendo CSV:", err);
    });

    res.json({ mensaje: "Plato eliminado lógicamente" });
  } else {
    res.status(404).json({ mensaje: "Plato no encontrado" });
  }
};
