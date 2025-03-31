const contentController = require("../controllers/contentController")
const router = require("express").Router();
const validation = require("../middleware/validate")
const {isAuthenticated} = require("../middleware/authenticate")

router.get("/", contentController.getAll)

router.get("/:id", contentController.getElementById)

router.post("/", isAuthenticated, validation.createAndUpdateElement, contentController.createNewElement)

router.put("/:id", isAuthenticated, validation.createAndUpdateElement, contentController.updateElementById)

router.delete("/:id", isAuthenticated, contentController.deleteElementById)

module.exports = router