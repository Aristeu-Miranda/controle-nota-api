const router = require("express").Router();
const noteController = require("../controllers/noteController");

router.route("/notes").post((req, res) => noteController.create(req, res));
router.route("/notes").get((req, res) => noteController.getAll(req, res));

module.exports = router;