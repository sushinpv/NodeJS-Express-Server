const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//middlewares
//const AuthAdmin = require('./app/middlewares/authAdmin');

//database configuration files 
var Config = require("./config/config.json");

//Initialize all routes
const { UserRoutes } = initRoutes();

//Connect to mongodb using default username and password
//mongoose.connect(Config._MONGOOSE);

//to display more details of the routes and to parse json and urlencoded data
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Allow all kind of access to the api. Otherwise we cant access remote service to this api's
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('X-Powered-By', 'bitElit Technologies');
    res.header('Server', 'bitElit');
    if (req.method === 'OPTIONS') {
        var headers = {};
        // IE8 does not allow domains to be specified, just the *
        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers['X-Powered-By', 'bitElit Technologies'];
        headers['Server', 'bitElit'];
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Auth-Token, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200, headers);
        res.end();
    } else {
        next();
    }
});

//Specify all routes for the system
app.use('/user', UserRoutes);


//Root
app.get('/', (req, res) => {
    res.status(200).json({
        message: "bitElit API server",
        server: "bitElit",
        client: req.header('User-Agent')
    })
});

//To through 404 error
app.use((req, res, next) => {
    const error = new Error('The page you are looking for not found');
    error.status = 404;
    next(error);
});

//To display any internal server error with specified message
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});


module.exports = app;

//import all routes
function initRoutes() {
    const UserRoutes = require('./app/routes/user');
    return {  UserRoutes };
}


