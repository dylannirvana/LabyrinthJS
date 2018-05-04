const router = require("express").Router();
const saveStatesRoutes = require("./saveStates");

// saveState routes
router.use("/saveStates", saveStatesRoutes);

// user auth routes
router.use("/dashboard", (req, res) => {
  res.status(200).json({
    message: "You're authorized to see this secret message.",
    // user values passed through from auth middleware
    user: req.user
  });
});

module.exports = router;