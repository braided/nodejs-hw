
import dns from 'node:dns';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import connectMongoDB from './db/connectMongoDB.js';
import notesRoutes from './routes/notesRoutes.js';
import logger from './middleware/logger.js';
import notFoundHandler from './middleware/notFoundHandler.js';
import errorHandler from './middleware/errorHandler.js';

dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(logger);
app.use(express.json());
app.use(cors());

// Маршрути нотаток
app.use('/notes', notesRoutes);

// Обробка невідомих маршрутів
app.use(notFoundHandler);

// Глобальна обробка помилок
app.use(errorHandler);

// Підключення до бази даних і запуск сервера
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
