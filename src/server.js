import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pinoHttp from 'pino-http';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(pinoHttp());

// Отримання всіх нотаток
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: 'Retrieved all notes',
  });
});

// Отримання нотатки за ID
app.get('/notes/:noteId', (req, res) => {
  const { noteId } = req.params;

  res.status(200).json({
    message: `Retrieved note with ID: ${noteId}`,
  });
});

// Тестова помилка
app.get('/test-error', () => {
  throw new Error('Simulated server error');
});

// Обробка невідомих маршрутів
app.use((req, res) => {
  res.status(404).json({
    message: 'Route not found',
  });
});

// Обробка помилок сервера
app.use((err, req, res, _next) => {
  req.log.error(err);

  res.status(500).json({
    message: err.message,
  });
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
