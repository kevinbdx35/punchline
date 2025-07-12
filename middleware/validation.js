const Joi = require('joi');

const quoteSchema = Joi.object({
  lang: Joi.string()
    .min(2)
    .max(10)
    .pattern(/^[a-zA-Z-]+$/)
    .required()
    .messages({
      'string.pattern.base': 'Language must contain only letters and hyphens',
      'string.min': 'Language must be at least 2 characters',
      'string.max': 'Language must not exceed 10 characters'
    }),
  quote: Joi.string()
    .min(10)
    .max(1000)
    .trim()
    .required()
    .messages({
      'string.min': 'Quote must be at least 10 characters',
      'string.max': 'Quote must not exceed 1000 characters'
    }),
  author: Joi.string()
    .min(2)
    .max(100)
    .trim()
    .required()
    .messages({
      'string.min': 'Author name must be at least 2 characters',
      'string.max': 'Author name must not exceed 100 characters'
    })
});

const validateQuote = (req, res, next) => {
  const { error, value } = quoteSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true
  });

  if (error) {
    const validationError = new Error('Validation failed');
    validationError.statusCode = 400;
    validationError.details = error.details.map(detail => ({
      field: detail.path.join('.'),
      message: detail.message
    }));
    return next(validationError);
  }

  req.body = value;
  next();
};

const validatePagination = (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  
  if (page < 1 || page > 1000) {
    const error = new Error('Page must be between 1 and 1000');
    error.statusCode = 400;
    return next(error);
  }
  
  req.query.page = page;
  next();
};

module.exports = { validateQuote, validatePagination };