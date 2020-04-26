import React, { useState, useEffect, useContext } from 'react';
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
import { About } from './components/About';
const LoginContext = React.createContext(false);
function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [clubs, setClubs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] =useState(false);
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
  }, []);
  
  function handleLogin() {
    setIsLoggedIn(true);
    console.log('logged in');
    //return <Redirect to="/"></Redirect>
  }
  return (
    <Router>
    <div className="App">
      {/* <header className="App-header">
        <p>The current time is {currentTime}.</p>
      </header> */}
      <LoginContext.Provider value={isLoggedIn}>
      <Navbar></Navbar>
      <Switch>
        { !isLoggedIn && <Route path="/login">
        <Login onLogin={handleLogin} />
        </Route> }
        <Route path="/about">
          <About></About>
        </Route>
        <Route path="/clubs">
        <ClubForm onNewClub={club => setClubs(currentClubs => [club, ...currentClubs])}></ClubForm>
        <Clubs clubs={clubs}/>
        </Route>
        { !isLoggedIn && 
        <Route path="/">
        <Login onLogin={handleLogin}/> </Route>}
        <Route path="/">
          <HomepageLayout/>
        </Route> 
      </Switch>
      </LoginContext.Provider>
    </div>
    </Router>
  );
}

export default App;