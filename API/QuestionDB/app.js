const express = require('express');
const bodyparser = require('body-parser');
const app = express();
async function init() {
    app.use(bodyparser.json({ limit: '50mb' }));
    app.use(bodyparser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
    const Response = require('./utilities/response');
    new Response(app);
    const exception = require('./config/exception');
    global.EXCEPTION = exception;
    const helper = require('./utilities/helper');
    global.HELPER = helper;
    const approuting = require('./modules');
    const appmodules = new approuting(app);
    appmodules.init();
}
init();
module.exports = app;