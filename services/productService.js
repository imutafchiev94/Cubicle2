const Cube = require('../models/Cube');

 function getAll() {
    var cubes = Cube.find({}).lean();

    return cubes;
}

function create(data) {
    let cube = new Cube(data);

    return cube.save();
}


module.exports = {
    getAll,
    create,

}