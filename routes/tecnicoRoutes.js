const router = require("express").Router();

const auth = require("../middlewares/authMiddleware");
const tecnicoController = require("../controllers/tecnicoController");

router.get("/", auth, tecnicoController.getAll);

router.post(
    "/",
    auth,
    tecnicoController.create
);

router.put(
    "/:id",
    auth,
    tecnicoController.update
);

router.delete(
    "/:id",
    auth,
    tecnicoController.remove
);

module.exports = router;