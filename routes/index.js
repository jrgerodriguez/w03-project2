const router = require("express").Router();

router.use('/', require('./swagger.js'))

router.get("/", (req, res) => {
    //#swagger.tags=['Hello from Routes']
    res.send("Hello from routes")
})

router.use("/life-hacks", require('./contentRoutes'))

module.exports = router