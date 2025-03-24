const contentController = require("../controllers/contentController")
const router = require("express").Router();
const validation = require("../middleware/validate")

router.get("/", contentController.getAll)

router.get("/:id", contentController.getElementById)

router.post("/", validation.createAndUpdateElement, contentController.createNewElement)

router.put("/:id", validation.createAndUpdateElement, contentController.updateElementById)

router.delete("/:id", contentController.deleteElementById)

module.exports = router