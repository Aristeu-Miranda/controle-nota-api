const router = require("express").Router();

//Note routes
const notesRouter = require("./note");
router.use("/", notesRouter);

module.exports = router;