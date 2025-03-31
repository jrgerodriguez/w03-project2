const express = require("express")
const app = express()
require("dotenv").config();
const routes = require("./routes")
const {connectDB} = require("./database/connection")
const bodyParser = require('body-parser');
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const GitHubStrategy = require("passport-github2").Strategy;
 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

var options = {
    explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5050

//Sessions Middleware
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
}))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

app.use(cors({methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
app.use(cors({origin: '*'}))

//GitHub Strategy
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URLSSSS
  },
  function(accessToken, refreshToken, profile, done) {

    try {
        console.log(profile)
        return done(null, profile);
    } catch (error) {
        console.error("Error in GitHub authentication:", error);
        return done(error, null);
    }
  }
));

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    done(null, user)
});

app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false}),
    (req, res) => {

        if (!req.user) {
            return res.status(400).json({ message: 'Authentication failed, user not found' });
        
        }

        req.session.user = req.user;
        res.redirect("/")
})

//Routes
app.use("/", routes)

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

//Start server and make connection to the database just once
async function startServer() {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`App listening on port ${PORT}`)
        })
    } catch (error) {
        console.error("Failed to start server:", error);
    }
}

startServer() 