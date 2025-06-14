const mongoose = require("mongoose");

const PlatoSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  ingredientes: [String],
  alergenos: [String],
  precio: Number,
  categoria: String,
    imagen: String, 
  activo: { type: Boolean, default: true }
});

module.exports = mongoose.model("Plato", PlatoSchema);
