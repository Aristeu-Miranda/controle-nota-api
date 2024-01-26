const router = require("express").Router();

//Note routes
const notesRouter = require("./note");
router.use("/", notesRouter);

//User routes
const userRouter = require("./user");
router.use("/", userRouter)

//Login routes
const loginRouter = require("./auth");
router.use("/", loginRouter)

module.exports = router;