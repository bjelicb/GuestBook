const mysql = require('mysql');// MySQL biblioteka

//Konfiguracija konekcije
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'guestbook'
});

// Povezuje se sa bazom podataka
db.connect((err) => {
  if (err) {
    throw err; // U slučaju greske pri povezivanju, izbacuje error
  }
  console.log('Connected to the database.');// Da znam da je sve u redu

// SQL upit za kreiranje tabele ako ne postoji
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS messages (
      id INT AUTO_INCREMENT PRIMARY KEY,
      message VARCHAR(255) NOT NULL,
      name VARCHAR(255) NOT NULL
    )
  `;

// Izvrsava SQL upit za kreiranje tabele
  db.query(createTableQuery, (err) => {
    if (err) {
      throw err; //Ako se desi problem da izbaci error
    }
    console.log('Table "messages" created or already exists.');// Poruka ukoliko tabela vec postoji
  });
});

module.exports = db; // Exportujemo objekat konekcije sa bazom kako bi mogao biti koriscen u drugim delovima aplikacije
