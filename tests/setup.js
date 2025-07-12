const fs = require('fs');
const path = require('path');

// Setup test database
const testDbPath = path.join(__dirname, 'test.db');

beforeEach(() => {
  // Clean up test database before each test
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath);
  }
  
  // Set test environment
  process.env.NODE_ENV = 'test';
  process.env.DATABASE_PATH = testDbPath;
});

afterAll(() => {
  // Clean up test database after all tests
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath);
  }
});