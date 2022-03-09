const sqlite3 = require('sqlite3');
const dbName = 'punchline.db';

let db = new sqlite3.Database(dbName, sqlite3.OPEN_READONLY, (err) => {
  if (err) {
    console.error('Database Errro');
  }
  console.log('Database : ' + dbName + ' is ready.');
});

db.close((err) => {
  if (err) {
    console.error('Database Errro');
  }
  console.log('Database : ' + dbName + ' is closed.');
});
