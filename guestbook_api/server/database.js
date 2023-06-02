const mysql = require('mysql');// MySQL biblioteka

//Konfiguracija konekcije
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
});

//Povezuje se sa MySQL serverom
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL server');

  //SQL upit za kreiranje baze podataka ako ne postoji
  const createDatabaseQuery = `CREATE DATABASE IF NOT EXISTS guestbook`;

  //Izvrsava SQL upit za kreiranje baze podataka
  db.query(createDatabaseQuery, (err) => {
    if (err) {
      throw err;
    }
    console.log('Database "guestbook" created or already exists');

   //Povezuje se sa bazom podataka "guestbook"
    db.changeUser({ database: 'guestbook' }, (err) => {
      if (err) {
        throw err;
      }
      console.log('Connected to database "guestbook"');

      //SQL upit za kreiranje tabele ako ne postoji
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          message VARCHAR(255) NOT NULL,
          name VARCHAR(255) NOT NULL
        )
      `;

      //Izvrsava SQL upit za kreiranje tabele
      db.query(createTableQuery, (err) => {
        if (err) {
          throw err;//Ako se desi problem da izbaci error
        }
        console.log('Table "messages" created or already exists');// Poruka ukoliko tabela vec postoji
      });
    });
  });
});

module.exports = db; // Exportujemo objekat konekcije sa bazom kako bi mogao biti koriscen u drugim delovima aplikacije
