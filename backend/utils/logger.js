const fs = require('fs');
const path = require('path');
const csvWriter = require('csv-writer').createObjectCsvWriter;
const logPath = path.join(__dirname, '..', 'logs', 'borrados.csv');


if (!fs.existsSync(path.join(__dirname, '..', 'logs'))) {
  fs.mkdirSync(path.join(__dirname, '..', 'logs'));
}


const writer = csvWriter({
  path: logPath,
  header: [
    { id: 'usuario', title: 'Usuario' },
    { id: 'accion', title: 'Accion' },
    { id: 'fecha', title: 'Fecha' }
  ],
  append: true
});

exports.registrarBorrado = async (usuario, accion) => {
  await writer.writeRecords([
    {
      usuario,
      accion,
      fecha: new Date().toISOString()
    }
  ]);
};
