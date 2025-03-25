const {client} = require("../database/connection")
const collection = client.db("life_hacks").collection("bloggers")
const ObjectId = require('mongodb').ObjectId;

//GET: Gets all elements in the collection
async function getAllBloggers(req, res) {
    //#swagger.tags=['Bloggers']
    try {
        const data = await collection.find().toArray()
        res.status(200).json(data)
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


//GET/id: Gets element by id
async function getBloggerById(req, res) {
    //#swagger.tags=['Bloggers']
    try {
        const { id } = req.params;

        if (!id || !ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Bad Request: Invalid or missing ID" });
        }

        const elementId = new ObjectId(id);
        const result = await collection.findOne({_id: elementId})
        res.status(200).json(result)
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


//POST: Creates a new element
async function createNewBlogger(req, res) {
    //#swagger.tags=['Bloggers']
    try {
        const element = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            city: req.body.city,
            country: req.body.country,
            instagram: req.body.instagram,
            facebook: req.body.facebook
        }

        if (!element.firstName || !element.lastName || !element.email || !element.city || !element.country) {
            return res.status(400).json({error: "Missing required fields"})
        }

        await collection.insertOne(element)

        res.status(200).json({message: "New Element Created Successfully"})

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
}


//PUT: Update an element by id
async function updateBloggerById(req, res) {
    //#swagger.tags=['Bloggers']
    try {

        const { id } = req.params;

        if (!id || !ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Bad Request: Invalid or missing ID" });
        }

        const elementId = new ObjectId(id);

        const element = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            city: req.body.city,
            country: req.body.country,
            instagram: req.body.instagram,
            facebook: req.body.facebook
        }

        const result = await collection.updateOne(
            {_id: elementId},
            {$set: element}
        )

        if (result.matchedCount === 0) {
            return res.status(400).json({error: "Element not found"})
        }

        res.status(200).json({message: "Element updated successfully"})

    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal Server Error"})
    }
}


//DELETE: Deletes an element by id
async function deleteBloggerById(req, res) {
    //#swagger.tags=['Bloggers']
    try {

        const { id } = req.params;

        if (!id || !ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Bad Request: Invalid or missing ID" });
        }

        const elementId = new ObjectId(id);

        await collection.deleteOne({_id: elementId})

        res.status(200).json({message: "Element successfully deleted"})

    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = {getAllBloggers, getBloggerById, createNewBlogger, updateBloggerById, deleteBloggerById}