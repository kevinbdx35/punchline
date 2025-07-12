const sqlite = require('better-sqlite3');
const path = require('path');
const config = require('../config');

let db;

try {
  db = new sqlite(path.resolve(config.databasePath), { 
    fileMustExist: false,
    verbose: config.nodeEnv === 'development' ? console.log : null
  });
  
  // Initialize database schema if needed
  initializeDatabase();
  
  console.log('✅ Database connected successfully');
} catch (error) {
  console.error('❌ Database connection failed:', error.message);
  process.exit(1);
}

function initializeDatabase() {
  const createQuotesTable = `
    CREATE TABLE IF NOT EXISTS quote (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lang TEXT NOT NULL,
      quote TEXT NOT NULL,
      author TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  
  const createIndexes = `
    CREATE INDEX IF NOT EXISTS idx_quote_lang ON quote(lang);
    CREATE INDEX IF NOT EXISTS idx_quote_author ON quote(author);
  `;
  
  db.exec(createQuotesTable);
  db.exec(createIndexes);
}

function query(sql, params = []) {
  try {
    return db.prepare(sql).all(params);
  } catch (error) {
    console.error('Database query error:', error.message);
    throw new Error('Database operation failed');
  }
}

function run(sql, params = []) {
  try {
    return db.prepare(sql).run(params);
  } catch (error) {
    console.error('Database run error:', error.message);
    throw new Error('Database operation failed');
  }
}

function get(sql, params = []) {
  try {
    return db.prepare(sql).get(params);
  } catch (error) {
    console.error('Database get error:', error.message);
    throw new Error('Database operation failed');
  }
}

function transaction(callback) {
  const trx = db.transaction(callback);
  return trx;
}

function close() {
  if (db) {
    db.close();
    console.log('Database connection closed');
  }
}

process.on('SIGINT', close);
process.on('SIGTERM', close);

module.exports = { query, run, get, transaction, close };
