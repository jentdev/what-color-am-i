const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// export as a mongoose model
module.exports = mongoose.model('Score', ScoreSchema);