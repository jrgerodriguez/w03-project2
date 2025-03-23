require("dotenv").config();
const {MongoClient} = require("mongodb")

const uri = process.env.DATABASE_URI

const client = new MongoClient(uri)

const connectDB = async () => {
    try {
        await client.connect()
        console.log("Connection Successful")
    } catch (error) {
        console.error("Connection Failed")
        throw error
    }
}

module.exports = {connectDB, client}