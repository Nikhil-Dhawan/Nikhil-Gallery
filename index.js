require('dotenv').config();
const cors = require('cors')
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
// const mongoString = "mongodb://localhost:27017/gallery";

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
// database.once('open', () => {
//     console.log('Database Connected');
// });

// const mongoose = require('mongoose');
// const mongoString = 'your-mongo-connection-string'; // Replace with your MongoDB connection string

// async function connectToDatabase() {
//     try {
//         await mongoose.connect(mongoString, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log('Database Connected');
//     } catch (error) {
//         console.error('Database connection error:', error);
//     }
// }

// Call the connectToDatabase function to establish the connection
// connectToDatabase();

// Now you can require your routes or models, etc.
// const routes = require('./routes/routes');
// const Model = require('../models/model');



const app = express();
app.use(cors())

const routes = require('./routes/routes');
// const Model = require('../models/model');

app.use('/api', routes)
app.use(express.json());


app.listen(8080, () => {
    console.log(`Server Started at ${8080}`)
})

// app.get('update_phase', (req, res) => {
//     fetch_data('gallery', 'prod', { Title: req.body.name }, {}, 0, [], (phase) => {
//         return res.json({ 'phase': phase[0].phase });
//     });
// });