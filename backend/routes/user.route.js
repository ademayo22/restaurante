const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/users.controller");
const auth = require("../auth/authorization");

router.post("/login", ctrl.login);
router.post("/", auth, ctrl.crear);
router.get("/", auth, ctrl.listar);
router.put("/:id", auth, ctrl.modificar);
router.delete("/:id", auth, ctrl.eliminar);

module.exports = router;
