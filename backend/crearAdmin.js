const mongoose = require("mongoose");
const User = require("./models/User.model");

mongoose.connect("mongodb://localhost:27017/restaurante")
  .then(async () => {
    await User.deleteOne({ usuario: "admin" }); // borra si existe

    const newUser = new User({
      usuario: "admin",
      password: "admin123",  // el pre('save') lo hashea
      esAdmin: true
    });

    await newUser.save();
    console.log("Admin creado correctamente");
    process.exit();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
