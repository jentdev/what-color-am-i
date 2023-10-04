const mongoose = require('mongoose');

const ScoreSchema = new mongoose.Schema({
    score: {
        type: Number,
        required: true,
    },
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Use model for populate
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// export as a mongoose model
module.exports = mongoose.model('Score', ScoreSchema);