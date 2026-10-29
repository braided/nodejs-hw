import dns from 'node:dns';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import createHttpError from 'http-errors';

import connectMongoDB from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import logger from './middleware/logger.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import errorHandler from './middleware/errorHandler.js';
dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logger);

// Тестова помилка
app.get('/test-error', (req, res, next) => {
  next(createHttpError(500, 'Simulated server error'));
});

// Маршрути нотаток
app.use('/notes', notesRoutes);

// Обробка невідомих маршрутів
app.use(notFoundHandler);

// Обробка помилок — завжди після маршрутів
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectMongoDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
