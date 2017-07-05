"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
// Creates and configures an ExpressJS web server.
var App = (function () {
    //Run configuration methods on the Express instance.
    function App() {
        this.express = express();
        this.middleware();
        this.connectDB();
        this.routes();
    }
    // Configure Express middleware.
    App.prototype.middleware = function () {
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(__dirname + './../client/dist/'));
    };
    //Configure Mongo DB
    App.prototype.connectDB = function () {
        mongoose.connect('mongodb://avas:V1CeeMoXPPnegBtB@replorer-shard-00-00-iv9tu.mongodb.net:27017,replorer-shard-00-01-iv9tu.mongodb.net:27017,replorer-shard-00-02-iv9tu.mongodb.net:27017/test?ssl=true&replicaSet=Replorer-shard-0&authSource=admin', function (err) {
            if (err) {
                console.log('There is error while connecting to MongoDB: ' + err);
            }
            else {
                console.log('Successfully connected to MongoDB!');
            }
        });
    };
    // Configure API endpoints.
    App.prototype.routes = function () {
        /* This is just to get up and running, and to make sure what we've got is
         * working so far. This function will change when we start to add more
         * API endpoints */
        var router = express.Router();
        // placeholder route handler
        router.get('*', function (req, res, next) {
            // res.json({
            //   message: 'Hello World!'
            // });
            res.sendFile(path.join(__dirname + './../client/dist/index.html'));
        });
        this.express.use('/', router);
    };
    return App;
}());
exports.default = new App().express;
