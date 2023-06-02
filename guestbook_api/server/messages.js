const express = require('express');
const router = express.Router(); //Kreiram instancu rutera
const db = require('./database');// Objekat konekcije sa bazom

// Endpoint za get poslednjih 10 poruka
router.get('/', (req, res) => {
  const selectQuery = 'SELECT * FROM messages ORDER BY id DESC LIMIT 10';

//Izvrsava se SQL upit
  db.query(selectQuery, (err, results) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving messages.');
    } else {
      res.json(results);// Vraca rezultate upita u JSON formatu
    }
  });
});

module.exports = router; // Exportujemo instancu rutera


