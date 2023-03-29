import path from 'node:path';
import http from 'node:http';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

import { router } from './router';
import cors from './app/middleware/cors';

const app = express();
const server = http.createServer(app);
export const io = new Server(server);

async function start () {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect('mongodb://localhost:27017');
    const port = 3001;

    app.use(cors);
    app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads')));
    app.use(express.json());
    app.use(router);

    dotenv.config();

    server.listen(port, () => console.log(`🚀 Server is running on https://localhost:${port}`));
  }
  catch (e) {
    console.log(e);
  }
}

start();