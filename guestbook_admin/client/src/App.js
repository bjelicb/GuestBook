import React from 'react'; //React biblioteka
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; //Komponente za rutiranje
import './App.css';//CSS stilovi

import Messages from './Messages';// Komponenta za prikaz poruka
import Submit from './Submit';// Komponenta za slanje poruke

const App = () => {
  return (
    <Router> {/* Wrap app u Router komponentu kako bismo omogucili rutiranje*/}
      <div className="app">{/* Glavni kontejner aplikacije*/}
        <h1 className="title">Guestbook</h1>
        <p className="description">See what people wrote about us and feel free to leave a message</p>
        <nav>
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>{/* Link koji vodi na pocetnu stranicu*/}
            </li>
            <li className="nav-item">
              <Link to="/submit" className="nav-link">Leave a message</Link>{/* Link koji vodi na Leave a message*/}
            </li>
          </ul>
        </nav>

        <div className="content">{/* Kontejner za sadržaj stranice*/}
          <Switch>{/* Komponenta za prebacivanje izmedju ruta*/}
            <Route exact path="/">{/* Putanja za Home*/}
              <Messages />{/* Komponenta sa porukama*/}
            </Route>
            <Route path="/submit">{/* Putanja za formu za slanje poruke*/}
              <Submit />{/* Komponenta za slanje poruke*/}
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;// Export App komponente
