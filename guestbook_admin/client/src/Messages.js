import React, { useState, useEffect } from 'react';

const Messages = () => {
  const [messages, setMessages] = useState([]);// Definise stanje messages kao prazan niz

  useEffect(() => {
    fetch('http://localhost:3001/api/messages') //HTTP GET zahtev ka serveru
      .then((response) => response.json())// Parsira odgovor kao JSON
      .then((data) => setMessages(data))// Azurira stanje messages sa podacima dobijenim iz odgovora
      .catch((error) => console.log(error));// Ukoliko se desi greska, ispisujemo je u konzoli
  }, []);

  return (
    <div className="table-container">
      <h2>Messages</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => ( 
            <tr key={message.id}> {/*Ključ je potreban kako bi se jedinstveno identifikovali elementi*/}
              <td>{message.name}</td>
              <td>{message.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Messages;// Export messages komponente
