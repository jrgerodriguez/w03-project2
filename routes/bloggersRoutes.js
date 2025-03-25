const bloggersController = require("../controllers/bloggersController")
const router = require("express").Router();
const validation = require("../middleware/validate")

router.get("/", bloggersController.getAllBloggers)

router.get("/:id", bloggersController.getBloggerById)

router.post("/", validation.createAndUpdateBlogger,  bloggersController.createNewBlogger)

router.put("/:id", validation.createAndUpdateBlogger,   bloggersController.updateBloggerById)

router.delete("/:id", bloggersController.deleteBloggerById)

module.exports = router