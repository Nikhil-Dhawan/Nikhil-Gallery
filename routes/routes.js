const express = require('express');

const router = express.Router()

module.exports = router;
// const Model = require('../models/model');
const modelSchema = require('../model/models');


//Post Method
// router.post('/post', (req, res) => {
//     res.send('Post API')
// })

router.post('/post', async (req, res) => {
    const data = new modelSchema({
        Title: req.body.Title,
        Technologies: req.body.Technologies,
        Frontend: req.body.Frontend,
        Backend: req.body.Backend,
        Databases: req.body.Databases,
        Infrastructure: req.body.Infrastructure
    })

    try {
        const dataToSave = await data.save();
        res.status(200).json(dataToSave)
    }
    catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get all Method
// router.get('/getAll', (req, res) => {
//     res.send('Get All API')
// })

router.get('/getAll', async (req, res) => {
    try{
        const data = await modelSchema.find();
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Get by ID Method
// router.get('/getOne/:id', (req, res) => {
//     res.send('Get by ID API')
// })

router.get('/getOne/:id', async (req, res) => {
    try{
        const data = await modelSchema.findById(req.params.id);
        res.json(data)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Update by ID Method
// router.patch('/update/:id', (req, res) => {
//     res.send('Update by ID API')
// })

router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedData = req.body;
        const options = { new: true };

        const result = await modelSchema.findByIdAndUpdate(
            id, updatedData, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Delete by ID Method
// router.delete('/delete/:id', (req, res) => {
//     res.send('Delete by ID API')
// })

router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = await modelSchema.findByIdAndDelete(id)
        res.send(`Document with ${data.name} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})
