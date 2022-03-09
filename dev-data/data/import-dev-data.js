const sqlite3 = require('sqlite3').verbose();
const dbName = 'main.db';

// Open the DB READ ONLY
let db = new sqlite3.Database(dbName, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Database : ' + dbName + ' is ready.');
});

// Data

// Close the DB
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Database : ' + dbName + ' is closed.');
});
