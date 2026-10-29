
import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, _next) => {
  req.log?.error(err);

  if (err instanceof HttpError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    message: 'Internal Server Error',
  });
};
