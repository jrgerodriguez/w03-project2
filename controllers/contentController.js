const {client} = require("../database/connection")
const collection = client.db("life_hacks").collection("hacks")
const ObjectId = require('mongodb').ObjectId;

//GET: Gets all elements in the collection
async function getAll(req, res) {
    //#swagger.tags=['Hacks']
    try {
        const data = await collection.find().toArray()
        res.status(200).json(data)
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}


//GET/id: Gets element by id
async function getElementById(req, res) {
    //#swagger.tags=['Hacks']
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
async function createNewElement(req, res) {
    //#swagger.tags=['Hacks']
    try {
        const element = {
            title: req.body.title,
            content: req.body.content,
            date_added: new Date().toISOString().split('T')[0]
        }

        if (!element.title || !element.content) {
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
async function updateElementById(req, res) {
    //#swagger.tags=['Hacks']
    try {

        const { id } = req.params;

        if (!id || !ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Bad Request: Invalid or missing ID" });
        }

        const elementId = new ObjectId(id);

        const element = {
            title: req.body.title,
            content: req.body.content,
            date_added: new Date().toISOString().split('T')[0]
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
async function deleteElementById(req, res) {
    //#swagger.tags=['Hacks']
    try {
        const elementId = new ObjectId(req.params.id)

        if (!elementId || !ObjectId.isValid(elementId)) {
            return res.status(400).json({ error: "Bad Request: Invalid or missing ID" });
        }

        await collection.deleteOne({_id: elementId})

        res.status(200).json({message: "Element successfully deleted"})

    } catch (error) {
        console.error(error)
        res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = {getAll, getElementById, createNewElement, updateElementById, deleteElementById}