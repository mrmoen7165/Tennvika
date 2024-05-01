const mysql = require('mysql');

// Konfigurer databaseforbindelsen
const connection = mysql.createConnection({
  host: '127.0.0.1', // Endre til din MySQL-serveradresse
  user: '', // Endre til din MySQL-brukernavn
  password: '', // Endre til din MySQL-passord
  database: 'gjestebok' // Endre til ditt database navn
});

// Koble til databasen
connection.connect((err) => {
  if (err) {
    console.error('Feil ved tilkobling til databasen: ' + err.stack);
    return;
  }
  console.log('Tilkoblet til MySQL-database med id ' + connection.threadId);
});

// Legg til en gjestebokoppføring i databasen
function addGuestbookEntry(entry, callback) {
  const sql = 'INSERT INTO guestbook_entries (name, stay_rating, service_rating, experience) VALUES (?, ?, ?, ?)';
  const values = [entry.name, entry.stayRating, entry.serviceRating, entry.experience];
  
  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Feil ved innsetting av gjestebokoppføring: ' + error);
      callback(error, null);
    } else {
      console.log('Gjestebokoppføring lagret med ID ' + results.insertId);
      callback(null, results.insertId);
    }
  });
}

// Hent alle gjestebokoppføringer fra databasen
function getAllGuestbookEntries(callback) {
  const sql = 'SELECT * FROM guestbook_entries';
  
  connection.query(sql, (error, results, fields) => {
    if (error) {
      console.error('Feil ved henting av gjestebokoppføringer: ' + error);
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
}

module.exports = {
  addGuestbookEntry,
  getAllGuestbookEntries
};
