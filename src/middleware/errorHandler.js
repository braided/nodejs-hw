
const errorHandler = (err, req, res, _next) => {
  req.log?.error(err);

  res.status(err.status || err.statusCode || 500).json({
    message: err.message || 'Internal server error',
  });
};

export default errorHandler; 
