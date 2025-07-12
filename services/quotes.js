const db = require('../services/db');
const config = require('../config');
const NodeCache = require('node-cache');

// Cache instance with TTL
const cache = new NodeCache({ stdTTL: config.cacheTtl });

async function getMultiple(page = 1, filters = {}) {
  const offset = (page - 1) * config.listPerPage;
  const { search, author, lang } = filters;
  
  let sql = 'SELECT * FROM quote';
  let params = [];
  let whereConditions = [];
  
  // Build dynamic query based on filters
  if (search) {
    whereConditions.push('(quote LIKE ? OR author LIKE ?)');
    params.push(`%${search}%`, `%${search}%`);
  }
  
  if (author) {
    whereConditions.push('author LIKE ?');
    params.push(`%${author}%`);
  }
  
  if (lang) {
    whereConditions.push('lang = ?');
    params.push(lang);
  }
  
  if (whereConditions.length > 0) {
    sql += ' WHERE ' + whereConditions.join(' AND ');
  }
  
  // Get total count for pagination
  const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total');
  const totalResult = db.get(countSql, params);
  const total = totalResult.total;
  
  // Add pagination
  sql += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
  params.push(config.listPerPage, offset);
  
  const data = db.query(sql, params);
  
  const totalPages = Math.ceil(total / config.listPerPage);
  
  return {
    data,
    meta: {
      page,
      totalPages,
      total,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
}

async function getById(id) {
  const cacheKey = `quote_${id}`;
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  const quote = db.get('SELECT * FROM quote WHERE id = ?', [id]);
  
  if (quote) {
    cache.set(cacheKey, quote, 3600); // Cache for 1 hour
  }
  
  return quote;
}

async function getRandom(lang = null) {
  let sql = 'SELECT * FROM quote';
  let params = [];
  
  if (lang) {
    sql += ' WHERE lang = ?';
    params.push(lang);
  }
  
  sql += ' ORDER BY RANDOM() LIMIT 1';
  
  return db.get(sql, params);
}

async function getStats() {
  const cacheKey = 'quote_stats';
  const cached = cache.get(cacheKey);
  
  if (cached) {
    return cached;
  }
  
  const totalQuotes = db.get('SELECT COUNT(*) as count FROM quote').count;
  const authorCount = db.get('SELECT COUNT(DISTINCT author) as count FROM quote').count;
  const langStats = db.query('SELECT lang, COUNT(*) as count FROM quote GROUP BY lang ORDER BY count DESC');
  const topAuthors = db.query('SELECT author, COUNT(*) as count FROM quote GROUP BY author ORDER BY count DESC LIMIT 5');
  
  const stats = {
    totalQuotes,
    totalAuthors: authorCount,
    languageDistribution: langStats,
    topAuthors
  };
  
  cache.set(cacheKey, stats, 900); // Cache for 15 minutes
  return stats;
}

async function create(quoteObj) {
  const { lang, quote, author } = quoteObj;
  
  // Check for duplicate quotes
  const existing = db.get('SELECT id FROM quote WHERE quote = ? AND author = ?', [quote, author]);
  if (existing) {
    const error = new Error('This quote already exists');
    error.statusCode = 409;
    throw error;
  }
  
  const result = db.run(
    'INSERT INTO quote (lang, quote, author) VALUES (?, ?, ?)',
    [lang, quote, author]
  );
  
  if (!result.changes) {
    const error = new Error('Failed to create quote');
    error.statusCode = 500;
    throw error;
  }
  
  // Clear cache to refresh stats
  cache.del('quote_stats');
  
  return {
    id: result.lastInsertRowid,
    message: 'Quote created successfully',
    quote: {
      id: result.lastInsertRowid,
      lang,
      quote,
      author
    }
  };
}

async function search(query, options = {}) {
  const { limit = 10, lang } = options;
  
  let sql = `
    SELECT *, 
    CASE 
      WHEN quote LIKE ? THEN 3
      WHEN author LIKE ? THEN 2
      ELSE 1
    END as relevance
    FROM quote 
    WHERE quote LIKE ? OR author LIKE ?
  `;
  
  let params = [`%${query}%`, `%${query}%`, `%${query}%`, `%${query}%`];
  
  if (lang) {
    sql += ' AND lang = ?';
    params.push(lang);
  }
  
  sql += ' ORDER BY relevance DESC, created_at DESC LIMIT ?';
  params.push(limit);
  
  return db.query(sql, params);
}

module.exports = { 
  getMultiple, 
  getById, 
  getRandom, 
  getStats, 
  create, 
  search 
};
