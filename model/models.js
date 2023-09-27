const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    Title: {
        required: true,
        type: String
    },
    Technologies: {
        required: true,
        type: String
    },
    Frontend: {
        required: true,
        type: String
    },
    Backend: {
        required: true,
        type: String
    },
    Databases: {
        required: true,
        type: String
    },
    Infrastructure: {
        required: true,
        type: String
    }
});
const SchemaData = mongoose.model('prod', dataSchema);

module.exports = SchemaData
