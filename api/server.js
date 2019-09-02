'use strict';

const express = require('express');
const bodyParser = require('body-parser');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routesUser = require('./src/Route/user'); //importing route
var routesWin = require('./src/Route/win'); //importing route
var routesMiddle = require('./src/Route/middle'); //importing route
routesMiddle(app); //register the route
routesUser(app); //register the route
routesWin(app); //register the route


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);