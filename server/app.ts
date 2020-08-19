import express, { NextFunction, Request, Response } from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';

import { HttpsErrorException } from './exceptions';
import connectToDB from './utils/connectToDB';
import { ErrorRes } from './Interfaces';
import UserRoutes from './routes/UserRoutes';

class Server {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
    this.mongo();
  }

  private routes(): void {
    this.app.use('/api/user', new UserRoutes().router);
    this.app.use((error: HttpsErrorException, req: Request, res: Response, next: NextFunction) => {
      console.log(error);
      const status = error.status || 500;

      const errorRes: ErrorRes = {
        message: error.message,
      };

      if (error.data) errorRes.data = error.data;

      res.status(status).json(errorRes);
    });
  }

  private mongo() {
    const connection = mongoose.connection;
    connection.on('connected', () => {
      console.log('MongoDB connection established');
    });
    connection.on('reconnected', () => {
      console.log('MongoDB reconnected successfully');
    });
    connection.on('disconnected', () => {
      console.log('MongoDB connection lost');
      console.log('Trying to reconnect to MongoDB...');
      setTimeout(() => {
        connectToDB({ socketTimeoutMS: 3000, connectTiomeoutMS: 3000 });
      }, 3000);
    });
    connection.on('close', () => {
      console.log('MongoDB connection closed');
    });
    connection.on('error', (error: Error) => {
      console.log('MongoDB connection error', error);
    });

    const run = async () => {
      await connectToDB();
    };

    run();
  }

  private config(): void {
    this.app.set('port', process.env.PORT || 3000);
    this.app.use(bodyParser.json());
    this.app.use(morgan('combined'));
    this.app.use(compression());
    this.app.use(cors());
  }

  public start(): void {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Api is running at ${this.app.get('port')}`);
    });
  }
}

const server = new Server();
server.start();
