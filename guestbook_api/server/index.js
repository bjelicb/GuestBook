const express = require('express');
const app = express();// Kreiramo Express app
const cors = require('cors');// CORS biblioteka za obradu CORS zahteva
const db = require('./database');
//Uvozim rutere da bi dohvatili endpoint za ucitavanje i slanje poruka
const messagesRouter = require('./messages');
const submitRouter = require('./submit');

app.use(cors());// CORS middleware
app.use(express.json()); // JSON parsing middleware
const port = 3001;// Port servera

// Registracija rutera
app.use('/api/messages', messagesRouter);
app.use('/api/submit', submitRouter);


// Startovanje servera na odabranom portu
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
