"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var HistoryRouter_1 = require("./routes/HistoryRouter");
var cors = require("cors");
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
        this.express.use(cors({
            origin: 'http://localhost:4200'
        }));
        this.express.use(logger('dev'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(express.static(__dirname + './../client/dist/'));
    };
    // Configure Mongo DB
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
        var router = express.Router();
        // get angular frontend
        router.get('/', function (req, res, next) {
            res.sendFile(path.join(__dirname + './../client/dist/index.html'));
        });
        this.express.use('/', router);
        // get REST endpoints
        this.express.use('/api/history', HistoryRouter_1.default);
    };
    return App;
}());
exports.default = new App().express;
