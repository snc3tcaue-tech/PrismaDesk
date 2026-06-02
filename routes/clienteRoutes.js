const router = require("express").Router();

const auth = require("../middlewares/authMiddleware");
const clienteController = require("../controllers/clienteController");

router.get("/", auth, clienteController.getAll);
router.get("/:id", auth, clienteController.getById);
router.put("/:id", auth, clienteController.update);
router.delete("/:id", auth, clienteController.remove);

module.exports = router;