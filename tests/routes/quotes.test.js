const request = require('supertest');
const express = require('express');
const quotesRouter = require('../../routes/quotes');
const { errorHandler } = require('../../middleware/errorHandler');

const app = express();
app.use(express.json());
app.use('/quotes', quotesRouter);
app.use(errorHandler);

describe('Quotes Routes', () => {
  beforeEach(async () => {
    // Insert test data
    const db = require('../../services/db');
    await db.run(
      'INSERT INTO quote (lang, quote, author) VALUES (?, ?, ?)',
      ['en', 'Test quote for API', 'API Test Author']
    );
  });

  describe('GET /quotes', () => {
    test('should return quotes with pagination', async () => {
      const response = await request(app)
        .get('/quotes')
        .expect(200);

      expect(response.body).toHaveProperty('data');
      expect(response.body).toHaveProperty('meta');
      expect(response.body.data).toBeInstanceOf(Array);
    });

    test('should accept pagination parameters', async () => {
      const response = await request(app)
        .get('/quotes?page=1')
        .expect(200);

      expect(response.body.meta.page).toBe(1);
    });

    test('should reject invalid page numbers', async () => {
      await request(app)
        .get('/quotes?page=0')
        .expect(400);

      await request(app)
        .get('/quotes?page=1001')
        .expect(400);
    });

    test('should filter by search term', async () => {
      const response = await request(app)
        .get('/quotes?search=API')
        .expect(200);

      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe('GET /quotes/:id', () => {
    test('should return quote by ID', async () => {
      const response = await request(app)
        .get('/quotes/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(response.body).toHaveProperty('quote');
      expect(response.body).toHaveProperty('author');
    });

    test('should return 404 for non-existent quote', async () => {
      await request(app)
        .get('/quotes/999')
        .expect(404);
    });

    test('should return 400 for invalid ID', async () => {
      await request(app)
        .get('/quotes/invalid')
        .expect(400);
    });
  });

  describe('GET /quotes/random', () => {
    test('should return a random quote', async () => {
      const response = await request(app)
        .get('/quotes/random')
        .expect(200);

      expect(response.body).toHaveProperty('quote');
      expect(response.body).toHaveProperty('author');
    });

    test('should filter by language', async () => {
      const response = await request(app)
        .get('/quotes/random?lang=en')
        .expect(200);

      expect(response.body.lang).toBe('en');
    });
  });

  describe('POST /quotes', () => {
    test('should create a new quote', async () => {
      const newQuote = {
        lang: 'fr',
        quote: 'Une nouvelle citation de test',
        author: 'Auteur Test'
      };

      const response = await request(app)
        .post('/quotes')
        .send(newQuote)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'Quote created successfully');
      expect(response.body).toHaveProperty('id');
    });

    test('should validate required fields', async () => {
      const invalidQuote = {
        lang: 'en'
        // missing quote and author
      };

      await request(app)
        .post('/quotes')
        .send(invalidQuote)
        .expect(400);
    });

    test('should validate quote length', async () => {
      const invalidQuote = {
        lang: 'en',
        quote: 'Short', // Too short
        author: 'Test Author'
      };

      await request(app)
        .post('/quotes')
        .send(invalidQuote)
        .expect(400);
    });

    test('should validate language format', async () => {
      const invalidQuote = {
        lang: 'invalid123', // Invalid format
        quote: 'This is a valid length quote for testing purposes',
        author: 'Test Author'
      };

      await request(app)
        .post('/quotes')
        .send(invalidQuote)
        .expect(400);
    });
  });

  describe('GET /quotes/stats', () => {
    test('should return statistics', async () => {
      const response = await request(app)
        .get('/quotes/stats')
        .expect(200);

      expect(response.body).toHaveProperty('totalQuotes');
      expect(response.body).toHaveProperty('totalAuthors');
      expect(response.body).toHaveProperty('languageDistribution');
      expect(response.body).toHaveProperty('topAuthors');
    });
  });
});