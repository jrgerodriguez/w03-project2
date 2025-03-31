const router = require("express").Router();
const passport = require("passport")

router.use('/', require('./swagger.js'))

//This route displays the message based on whether there is an existing session or not
router.get("/", (req, res) => {
    //#swagger.tags=['']
    if (req.session.user === undefined) {
        return res.send("Logged Out");
    }
    res.send(`Logged in as ${req.session.user.displayName}`);
});

router.use("/life-hacks", require('./contentRoutes'))

router.use("/bloggers", require('./bloggersRoutes'))

router.get('/login', (req, res, next) => {
    //#swagger.description = 'Route to authenticate with GitHub using OAuth'
    //#swagger.security = [{
    //    "OAuth2": ["read:user", "user:email"]
    //}]
    if (!req.isAuthenticated()) {
      passport.authenticate('github')(req, res, next);
    } else {
      return res.redirect('/');
    }
});

router.get('/logout', (req, res) => {
    //#swagger.description = 'Route to logout'
    req.logout((err) => {
        if (err) {
            return next(err); 
        }
        res.redirect('/');
    });
})



module.exports = router