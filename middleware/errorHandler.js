const config = require('../config');

const errorHandler = (err, req, res, next) => {
  console.error('Error occurred:', {
    message: err.message,
    stack: config.nodeEnv === 'development' ? err.stack : undefined,
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      message: config.nodeEnv === 'production' && statusCode === 500 
        ? 'Something went wrong' 
        : message,
      status: statusCode,
      ...(config.nodeEnv === 'development' && { stack: err.stack })
    }
  });
};

const notFoundHandler = (req, res) => {
  res.status(404).json({
    error: {
      message: 'Route not found',
      status: 404,
      path: req.path
    }
  });
};

module.exports = { errorHandler, notFoundHandler };