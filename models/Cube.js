const mongoose = require("mongoose");

const CubeSchema = new mongoose.Schema({
  name: 
    { 
      type: String, 
      required: true 
    },
  description: 
    { 
      type: String, 
      required: true, 
      maxLength: 250 
    },
  imageUrl: 
    { 
      type: String, 
      required: true, 
      validate: /^https?/ 
    },
  difficultyLevel: 
    { 
       type: Number, required: true,
       min: 1,
       max: 6 
    },
  Accessories: 
    [
        { 
          type: mongoose.Types.ObjectId,
          ref: "Accessory" 
        }
    ],
  creator: 
    {
        type: mongoose.Types.ObjectId,
        ref: "User",
    },
});

module.exports = mongoose.model("Cube", CubeSchema);
