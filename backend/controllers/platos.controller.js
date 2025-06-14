const Plato = require("../models/Plato.model");

exports.crear = async (req, res) => {
  console.log("REQ BODY crear:", req.body);
  const plato = new Plato(req.body);
  await plato.save();
  res.status(201).json(plato);
};

exports.listar = async (req, res) => {
  const { categoria } = req.query;
  const query = { activo: true };
  if (categoria) query.categoria = categoria;
  const platos = await Plato.find(query);
  res.json(platos);
};

exports.modificar = async (req, res) => {
   console.log("REQ BODY MODIFICAR:", req.body);
  const { id } = req.params;
  const plato = await Plato.findByIdAndUpdate(id, req.body, { new: true });
  res.json(plato);
};

exports.eliminar = async (req, res) => {
  const { id } = req.params;
  await Plato.findByIdAndUpdate(id, { activo: false });
  res.json({ mensaje: "Plato eliminado lógicamente" });
};
