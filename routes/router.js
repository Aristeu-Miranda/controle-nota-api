const router = require("express").Router();

//Note routes
const notesRouter = require("./note");
router.use("/", notesRouter);

//User routes
const userRouter = require("./user");
router.use("/", userRouter)

module.exports = router;