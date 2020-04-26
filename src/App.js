import React, { useState, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import 'semantic-ui-css/semantic.min.css'
import './App.css';
import { Clubs } from "./components/clubs"
import { ClubForm } from './components/ClubForm';
import { Navbar } from './components/Navbar'; 
import { Container } from 'semantic-ui-react';
import { Login } from './components/Login';
import { HomepageLayout } from './components/HomepageLayout';
function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [clubs, setClubs] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/time').then(response =>
      response.json()).then(data => {
        setCurrentTime(data.time);
        console.log(data.time);
      })
  }, []);

  useEffect(() => {
    fetch('/clubs').then(response =>
      response.json()).then(data => {
        setClubs(data.clubs);
        console.log(data);
      }
        );
  }, [])
  console.log(clubs)
  return (
    <Router>
    <div className="App">
      {/* <header className="App-header">
        <p>The current time is {currentTime}.</p>
      </header> */}
      <Navbar></Navbar>
      <Switch>
        <Route path="/login">
        <Login />
        </Route>
        <Route path="/about">
          
        </Route>
        <Route path="/clubs">
        <ClubForm onNewClub={club => setClubs(currentClubs => [club, ...currentClubs])}></ClubForm>
        <Clubs clubs={clubs}/>
        </Route>
        <Route path="/">
          <HomepageLayout/>
        </Route> 
      </Switch>
    </div>
    </Router>
  );
}

export default App;