import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';
import ErrorHandler from './middlewares/error.middleware';
import Logger from './config/logger';

import morgan from 'morgan';

import session from 'express-session';
import swaggerUi from 'swagger-ui-express';
const swaggerDocument = require('./doc/swagger-output.json');

class App {
  public app: Application;
  public host: string | number;
  public port: string | number;
  public api_version: string | number;
  public env: boolean;
  private logStream = Logger.logStream;
  private logger = Logger.logger;
  public errorHandler = new ErrorHandler();

  constructor() {
    this.app = express();
    this.host = process.env.APP_HOST;
    this.port = process.env.APP_PORT;
    this.api_version = process.env.API_VERSION;

    this.initializeMiddleWares();
    this.initializeRoutes();
    this.initializeErrorHandlers();
    this.startApp();
  }

  public initializeMiddleWares(): void {
    this.app.use(cors());
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(morgan('combined', { stream: this.logStream }));
  //   this.app.use(
  //     session({
  //       secret: process.env.SESSION_SECRET ,
  //       resave: false, 
  //       saveUninitialized: false, 
  //       cookie: {
  //         maxAge: 1000 * 60 * 60 * 24, // 1 day
  //         httpOnly: true, 
  //       },
  //     })
  //   );
   }

  
  public initializeRoutes(): void {
    this.app.use(`/api/${this.api_version}`, routes());
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }

  public initializeErrorHandlers(): void {
    this.app.use(this.errorHandler.appErrorHandler);
    this.app.use(this.errorHandler.genericErrorHandler);
    this.app.use(this.errorHandler.notFound);
  }

  public startApp(): void {
    this.app.listen(this.port, () => {
      this.logger.info(
        `Server started at ${this.host}:${this.port}/api/${this.api_version}/`
      );
    });
  }

  public getApp(): Application {
    return this.app;
  }
}

const app = new App();

export default app;
