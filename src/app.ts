import * as path from 'path';
import * as express from 'express';
import * as logger from 'morgan';
import * as bodyParser from 'body-parser';
import * as mongoose from 'mongoose';

// Creates and configures an ExpressJS web server.
class App {

  // ref to Express instance
  public express: express.Application;

  //Run configuration methods on the Express instance.
  constructor() {
    this.express = express();
    this.middleware();
    this.connectDB();
    this.routes();
  }

  // Configure Express middleware.
  private middleware(): void {
    this.express.use(logger('dev'));
    this.express.use(bodyParser.json());
    this.express.use(bodyParser.urlencoded({ extended: false }));
  }

  //Configure Mongo DB
  private connectDB(): void {
    mongoose.connect('mongodb://avas:V1CeeMoXPPnegBtB@replorer-shard-00-00-iv9tu.mongodb.net:27017,replorer-shard-00-01-iv9tu.mongodb.net:27017,replorer-shard-00-02-iv9tu.mongodb.net:27017/test?ssl=true&replicaSet=Replorer-shard-0&authSource=admin', function(err) {
      if (err) {
        console.log('There is error while connecting to MongoDB: ' + err);
      } else {
        console.log('Successfully connected to MongoDB!');
      }
    });
  }

  // Configure API endpoints.
  private routes(): void {
    /* This is just to get up and running, and to make sure what we've got is
     * working so far. This function will change when we start to add more
     * API endpoints */
    let router = express.Router();
    // placeholder route handler
    router.get('*', (req, res, next) => {
      res.json({
        message: 'Hello World!'
      });
    });
    this.express.use('/', router);
  }

}

export default new App().express;