const mongoose = require('mongoose');

const AccessorySchema = new mongoose.Schema({
    name: 
    {
        type: String, 
        required: true
    },
    imageUrl: 
    {
        type: String, 
        required: true, 
        validate: /^https?/
    },
    description: 
    {
        type: String, 
        required: true, 
        maxLength: 250
    },  
})

module.exports = mongoose.model("Accessory", AccessorySchema);