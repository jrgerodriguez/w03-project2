const express = require("express")
const app = express()
require("dotenv").config();
const routes = require("./routes")
const {connectDB} = require("./database/connection")
const bodyParser = require('body-parser');
 
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');

var options = {
    explorer: true
};

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5050

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