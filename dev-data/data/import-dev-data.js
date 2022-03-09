const sqlite3 = require('sqlite3');
const dbName = 'punchline.db';

let db = new sqlite3.Database(dbName);

console.log('Database : ' + dbName);

db.close();
