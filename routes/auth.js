const router = require("express").Router();
const loginController = require("../controllers/loginController")

router.route("/login").post((req, res) => loginController(req, res));

module.exports = router;
