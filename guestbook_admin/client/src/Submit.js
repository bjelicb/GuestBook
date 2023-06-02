import React, { useState } from 'react';

const Submit = () => {
  const [message, setMessage] = useState('');// Definisem stanje za poruku
  const [name, setName] = useState('');// Definisem stanje za ime
  const [status, setStatus] = useState('');// Definisem stanje za status poruke (success, failed, sending)
  const [disableButton, setDisableButton] = useState(false);// Definisem stanje za blokiranje dugmeta
  const [messageSent, setMessageSent] = useState(false);// Definisem stanje da li je poruka poslata
  const [showAnotherMessageButton, setShowAnotherMessageButton] = useState(false); // Stanje za prikazivanje dugmeta "Another Message"

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message || !name || messageSent) { // Proverava
      setStatus('failed');// Postavljamo status na failed
      return;
    }

    setStatus('sending');// Postavljamo status na sending
    setDisableButton(true); // Blokiramo dugme

    fetch('http://localhost:3001/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, name })// Saljemo podatke o poruci i imenu u JSON formatu
    })
      .then((response) => {
        if (response.ok) {// Proveravamo da li je odgovor uspesan
          setStatus('success');// Postavljamo status na success
          setMessage('');// Resetujemo stanje poruke
          setName('');// Resetujemo stanje imena
          setMessageSent(true);// Postavljamo da je poruka poslata
          setShowAnotherMessageButton(true); // Prikazujemo dugme "Another Message"
        } else {
          setStatus('failed');// Postavljamo status na failed
        }
        setDisableButton(false);// Blokiramo dugme za slanje poruke
      })
      .catch((error) => {
        console.log(error);
        setStatus('failed');
        setDisableButton(false);
      });
  };

  const handleAnotherMessageClick = () => {
    setShowAnotherMessageButton(false); // Sakrivamo dugme "Another Message"
    setMessageSent(false); // Postavljam da poruka nije poslata kako bi korisnik mogao da posalje novu poruku
    setStatus(''); // Resetujemo status
  };

  let statusMessage = null;
  if (status === 'sending') {
    statusMessage = 'Sending...';
  } else if (status === 'success') {
    statusMessage = 'Success';
  } else if (status === 'failed') {
    if (!message || !name) {
      statusMessage = 'Fields cannot be empty';
    } else {
      statusMessage = 'Press button to send';
    }
  }

  let statusColor = '';
  if (status === 'success') {
    statusColor = 'green';
  } else if (status === 'failed') {
    statusColor = 'red';
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Leave a Message</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-field">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea id="message" className="form-input" placeholder="Enter your message" value={message} onChange={(e) => setMessage(e.target.value)}></textarea>{/* Tekstualno polje za unos poruke*/}
        </div>
        <div className="form-field">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" id="name" className="form-input" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} />{/* Polje za unos imena*/}
        </div>
        <button type="submit" className="button" disabled={disableButton || messageSent}>Post</button>
		{/* Proveravamo da li je poruka uspesno poslata i da li treba prikazati dugme "Another Message"*/}
        {status === 'success' && showAnotherMessageButton && (
          <button type="button" className="button" onClick={handleAnotherMessageClick}>Another Message</button>
        )}
        <p style={{ color: statusColor }}>{statusMessage}</p>{/* Poruka o statusu slanja poruke*/}
      </form>
    </div>
  );
};

export default Submit; //Exportujemo submit
