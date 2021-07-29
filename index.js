const express = require('express');

const app = express();

const config = require('./config/config');
const expressConfig = require('./config/expressConfig');
const mongooseConfig = require('./config/mongooseConfig');
const routes = require('./routes');

expressConfig(app);
require('./config/mongooseConfig')(app);
app.use(routes);



app.listen(config.PORT, () => {
    console.log(`Server is listening on port ${config.PORT}`);
})


