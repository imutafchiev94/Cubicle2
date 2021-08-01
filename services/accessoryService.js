const Cube = require('../models/Cube');
const Accessory = require('../models/Accessory');

async function getAll() {
    let accessories = await Accessory.find({}).lean();

    return accessories;
}

async function getOne(id) {
    let accessory = await Accessory.findById(id).lean();

    return accessory;
} 

async function create(data) {
    let accessory = new Accessory(data);

    return accessory.save();
}

async function attach(data, id) {
    let cube = await Cube.findById(id)
    let accessory = await Accessory.findById(data.accessory);

    console.log(accessory);

    await cube.Accessories.push(accessory);

    return cube.save();
}


module.exports = {
    getAll,
    getOne,
    create,
    attach
}