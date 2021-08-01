const { where, $where } = require('../models/Cube');
const Cube = require('../models/Cube');

 async function getAll(data) {
    var searched = await Cube.find({}).lean();

    if(data.search)
    {
        searched = searched.filter(x => x.name.toLowerCase().includes(data.search));
    }
    if(data.from) 
    {
        searched = searched.filter(x => x.difficultyLevel >= parseInt(data.from));
    }
    if(data.to)
    {
        searched = searched.filter(x => x.difficultyLevel <= parseInt(data.to));
    }
    return searched;
}

function create(data) {
    let cube = new Cube(data);

    return cube.save();
}

async function getOne(id) {

  let cube = await Cube.findById(id).lean();

  return cube;
}

function update(id, data) {
    let cube = Cube.findByIdAndUpdate(id, data);

    return cube.save();
}

module.exports = {
    getAll,
    create,
    getOne,
    update,

}