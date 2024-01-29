const router = require("express").Router();
const noteController = require("../controllers/noteController");
const authMiddleware = require("../middlewares/authMiddleware");


router.route("/notes").post(authMiddleware, (req, res) => noteController.create(req, res));
router.route("/notes").get((req, res) => noteController.getAll(req, res));
router.route("/notes/:id").get((req, res) => noteController.get(req, res));
router.route("/notes/:id").put((req, res) => noteController.update(req, res));
router.route("/notes/:id").delete((req, res) => noteController.delete(req, res));

module.exports = router;