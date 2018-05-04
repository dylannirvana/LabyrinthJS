const router = require("express").Router();
const saveStatesController = require("../../controllers/saveStatesController");

// Matches with "/api/saveStates"
router.route("/")
  .get(saveStatesController.findAll)
  .post(saveStatesController.create);

// Matches with "/api/saveStates/:id"
router.route("/:id")
  .get(saveStatesController.findById)
  .put(saveStatesController.update)
  .delete(saveStatesController.remove);

module.exports = router;