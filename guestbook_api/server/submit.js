const express = require('express');
const router = express.Router();
const db = require('./database');

// Endpoint za slanje poruke
router.post('/', (req, res) => {
  const { message, name } = req.body; // Uzimamo poruku i ime iz body zahteva
  const insertQuery = 'INSERT INTO messages (message, name) VALUES (?, ?)'; // SQL upit za unos poruke i imena u tabelu 

  db.query(insertQuery, [message, name], (err) => { // Izvrsava SQL upit na bazi sa parametrima message i name
    if (err) {
      console.log(err);
      res.status(500).send('Error saving the message.'); // Vracamo statusni kod 500 i poruku o grešci
    } else {
      res.sendStatus(200); // Vraca statusni kod 200 (OK) da je poruka uspesno sacuvana
    }
  });
});

module.exports = router; // Exportujemo instancu
