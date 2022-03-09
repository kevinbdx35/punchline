const sqlite3 = require('sqlite3').verbose();
const dbName = 'punchline.db';

// Open the DB READ ONLY
let db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    return console.error('Database Error');
  }
  console.log('Database : ' + dbName + ' is ready.');
});

// close the DB
db.close((err) => {
  if (err) {
    return console.error('Database Error');
  }
  console.log('Database : ' + dbName + ' is closed.');
});
