const bloggersController = require("../controllers/bloggersController")
const router = require("express").Router();
const validation = require("../middleware/validate")
const {isAuthenticated} = require("../middleware/authenticate")

router.get("/", bloggersController.getAllBloggers)

router.get("/:id", bloggersController.getBloggerById)

router.post("/", isAuthenticated, validation.createAndUpdateBlogger,  bloggersController.createNewBlogger)

router.put("/:id", isAuthenticated, validation.createAndUpdateBlogger,   bloggersController.updateBloggerById)

router.delete("/:id", isAuthenticated, bloggersController.deleteBloggerById)

module.exports = router