const express = require('express');
const router = express.Router();
const quotes = require('../services/quotes');
const { validateQuote, validatePagination } = require('../middleware/validation');

// GET quotes listing with pagination and optional search
router.get('/', validatePagination, async (req, res, next) => {
  try {
    const { page, search, author, lang } = req.query;
    const result = await quotes.getMultiple(page, { search, author, lang });
    
    res.set('Cache-Control', 'public, max-age=300'); // 5 minutes cache
    res.json(result);
  } catch (err) {
    next(err);
  }
});

// GET single quote by ID
router.get('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id < 1) {
      const error = new Error('Invalid quote ID');
      error.statusCode = 400;
      return next(error);
    }
    
    const quote = await quotes.getById(id);
    if (!quote) {
      const error = new Error('Quote not found');
      error.statusCode = 404;
      return next(error);
    }
    
    res.set('Cache-Control', 'public, max-age=3600'); // 1 hour cache
    res.json(quote);
  } catch (err) {
    next(err);
  }
});

// GET random quote
router.get('/random', async (req, res, next) => {
  try {
    const { lang } = req.query;
    const quote = await quotes.getRandom(lang);
    
    res.set('Cache-Control', 'public, max-age=60'); // 1 minute cache
    res.json(quote);
  } catch (err) {
    next(err);
  }
});

// POST quote with validation
router.post('/', validateQuote, async (req, res, next) => {
  try {
    const result = await quotes.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

// GET quote statistics
router.get('/stats', async (req, res, next) => {
  try {
    const stats = await quotes.getStats();
    
    res.set('Cache-Control', 'public, max-age=900'); // 15 minutes cache
    res.json(stats);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
