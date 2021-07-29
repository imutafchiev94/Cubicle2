const mongoose = require('mongoose');

module.exports = (app) => {
    mongoose.connect('mongodb://localhost:27017/cubicle2', { useNewUrlParser: true, useUnifiedTopology: true });

    const db = mongoose.connection;

    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', console.info.bind(console, 'Db Connected'));
}