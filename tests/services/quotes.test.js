const quotes = require('../../services/quotes');
const db = require('../../services/db');

describe('Quotes Service', () => {
  beforeEach(async () => {
    // Insert test data
    await db.run(
      'INSERT INTO quote (lang, quote, author) VALUES (?, ?, ?)',
      ['en', 'Test quote 1', 'Test Author 1']
    );
    await db.run(
      'INSERT INTO quote (lang, quote, author) VALUES (?, ?, ?)',
      ['fr', 'Test quote 2', 'Test Author 2']
    );
  });

  describe('getMultiple', () => {
    test('should return quotes with pagination', async () => {
      const result = await quotes.getMultiple(1);
      
      expect(result).toHaveProperty('data');
      expect(result).toHaveProperty('meta');
      expect(result.data).toBeInstanceOf(Array);
      expect(result.data.length).toBeGreaterThan(0);
      expect(result.meta).toHaveProperty('page', 1);
    });

    test('should filter by search term', async () => {
      const result = await quotes.getMultiple(1, { search: 'Test quote 1' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].quote).toContain('Test quote 1');
    });

    test('should filter by language', async () => {
      const result = await quotes.getMultiple(1, { lang: 'en' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].lang).toBe('en');
    });

    test('should filter by author', async () => {
      const result = await quotes.getMultiple(1, { author: 'Test Author 1' });
      
      expect(result.data).toHaveLength(1);
      expect(result.data[0].author).toBe('Test Author 1');
    });
  });

  describe('getById', () => {
    test('should return quote by ID', async () => {
      const result = await quotes.getById(1);
      
      expect(result).toBeTruthy();
      expect(result.id).toBe(1);
      expect(result.quote).toBe('Test quote 1');
    });

    test('should return null for non-existent ID', async () => {
      const result = await quotes.getById(999);
      
      expect(result).toBeUndefined();
    });
  });

  describe('getRandom', () => {
    test('should return a random quote', async () => {
      const result = await quotes.getRandom();
      
      expect(result).toBeTruthy();
      expect(result).toHaveProperty('quote');
      expect(result).toHaveProperty('author');
    });

    test('should filter by language', async () => {
      const result = await quotes.getRandom('en');
      
      expect(result).toBeTruthy();
      expect(result.lang).toBe('en');
    });
  });

  describe('create', () => {
    test('should create a new quote', async () => {
      const newQuote = {
        lang: 'es',
        quote: 'Nueva cita de prueba',
        author: 'Autor de Prueba'
      };

      const result = await quotes.create(newQuote);
      
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('message', 'Quote created successfully');
      expect(result.quote).toMatchObject(newQuote);
    });

    test('should prevent duplicate quotes', async () => {
      const duplicateQuote = {
        lang: 'en',
        quote: 'Test quote 1',
        author: 'Test Author 1'
      };

      await expect(quotes.create(duplicateQuote))
        .rejects
        .toThrow('This quote already exists');
    });
  });

  describe('getStats', () => {
    test('should return statistics', async () => {
      const result = await quotes.getStats();
      
      expect(result).toHaveProperty('totalQuotes');
      expect(result).toHaveProperty('totalAuthors');
      expect(result).toHaveProperty('languageDistribution');
      expect(result).toHaveProperty('topAuthors');
      expect(result.totalQuotes).toBeGreaterThan(0);
    });
  });

  describe('search', () => {
    test('should search quotes', async () => {
      const result = await quotes.search('Test');
      
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBeGreaterThan(0);
    });

    test('should limit search results', async () => {
      const result = await quotes.search('Test', { limit: 1 });
      
      expect(result).toHaveLength(1);
    });
  });
});