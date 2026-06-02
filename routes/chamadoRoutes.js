const express = require("express");
const router = express.Router();

const auth = require("../middlewares/authMiddleware");
const chamadoController = require("../controllers/chamadoController");

// TODOS OS CHAMADOS
router.get("/", auth, chamadoController.getAll);

// CHAMADOS DO CLIENTE LOGADO
router.get("/meus", auth, chamadoController.getMeusChamados);

// CRIAR
router.post("/", auth, chamadoController.create);

// ALTERAR STATUS
router.put("/:id/status", auth, chamadoController.updateStatus);

// HISTÓRICO
router.get("/:id/historico", auth, chamadoController.getHistorico);

module.exports = router;