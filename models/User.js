const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: 
    { 
        type: String,
        required: true
    },
    password: 
    {
        required: true,
        type: String
    }
});

module.exports = mongoose.model('User',UserSchema);