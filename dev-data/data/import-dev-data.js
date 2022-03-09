const sqlite3 = require('sqlite3');
const dbName = 'main.db';

// Open the DB READ ONLY
let db = new sqlite3.Database(dbName, sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Database : ' + dbName + ' is ready.');
});

// Data
// db.run(
//   'CREATE TABLE punch(id, lang, author, punchline)'
// );

// db.run(
//   'INSERT INTO punch(id, lang, author, punchline) VALUES(0, "fr", "toto", "toto est cool!")'
// );

db.get('SELECT * FROM punch', (err, data) => {
  if (err) {
    return console.error(err.message);
  }
  console.log(data);
});

// Close the DB
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Database : ' + dbName + ' is closed.');
});
