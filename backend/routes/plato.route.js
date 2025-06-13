const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/platos.controller");
const auth = require("../auth/authorization");

router.post("/", auth, ctrl.crear);
router.get("/", ctrl.listar);
router.put("/:id", auth, ctrl.modificar);
router.delete("/:id", auth, ctrl.eliminar);

module.exports = router;
