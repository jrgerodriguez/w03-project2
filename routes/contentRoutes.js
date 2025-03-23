const contentController = require("../controllers/contentController")
const router = require("express").Router();

router.get("/", contentController.getAll)

router.get("/:id", contentController.getElementById)

router.post("/", contentController.createNewElement)

router.put("/:id", contentController.updateElementById)

router.delete("/:id", contentController.deleteElementById)

module.exports = router