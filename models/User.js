const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        sparse: true
    },
    password: {
        type: String,
        sparse: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

// export as a mongoose model
module.exports = mongoose.model('User', UserSchema);