const router = require("express").Router();
const saveStatesRoutes = require("./saveStates");

// Headline routes
router.use("/saveStates", saveStatesRoutes);

module.exports = router;