const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
    red: {
        type: Number,
        required: true,
    },
    green: {
        type: String,
        required: true,
    },
    blue: {
        type: String,
        required: true,
    },
    hex: {
        type: String,
        required: true,
    }
});

// export as a mongoose model
module.exports = mongoose.model('Color', ColorSchema);