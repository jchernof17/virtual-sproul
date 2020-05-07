import React, { useState, useEffect, useMemo } from 'react';
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
import { UserContext } from './UserContext';


function App() {
  const [currentTime, setCurrentTime] = useState(0);
  const [clubs, setClubs] = useState([]);
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  useEffect(() => {
    fetch('/time').then(response =>
      response.json()).then(data => {
        setCurrentTime(data.time);
        console.log(data.time);
      })
  }, []);

  useEffect(() => {
    setUser(localStorage.getItem("User") || null)
  }, [user]);

  useEffect(() => {
    fetch('/clubs').then(response =>
      response.json()).then(data => {
        setClubs(data.clubs);
        console.log(data);
      }
        );
  }, []);
  
  // function handleLogin() {
  //   setIsLoggedIn(true);
  //   console.log('logged in');
  //   //return <Redirect to="/"></Redirect>
  // }
  return (
    <Router>
      <UserContext.Provider value={value}>
        <Navbar/>
        <Switch>
          <Route exact path="/">
            {user ? <Clubs/> : <HomepageLayout/> }
          </Route>
          <Route path="/about">
            <About/>
          </Route>
          <Route path="/clubs">
            <Clubs clubs={clubs}/>
          </Route>
          <Route path="/login">
            {user ? <Redirect to="/"/> : <Login/>}
          </Route>
          <Route path="/logout">
            {user ? <About/> : <Redirect to="/login"/>}
          </Route>
        </Switch>
      </UserContext.Provider>
    </Router>

  );
  
  
  // return (
  //   <Router>
  //   <div className="App">
  //     {/* <header className="App-header">
  //       <p>The current time is {currentTime}.</p>
  //     </header> */}
  //     <UserContext.Provider value={value}>
  //     <Navbar></Navbar>
  //     <Switch>
  //       { user && <Route path="/login">
  //       <Login onLogin={handleLogin} />
  //       </Route> }
  //       <Route path="/about">
  //         <About></About>
  //       </Route>
  //       <Route path="/clubs">
  //       <ClubForm onNewClub={club => setClubs(currentClubs => [club, ...currentClubs])}></ClubForm>
  //       <Clubs clubs={clubs}/>
  //       </Route>
  //       { user || 
  //       <Route path="/">
  //       <Login onLogin={handleLogin}/> </Route>}
  //       <Route path="/">
  //         <HomepageLayout/>
  //       </Route> 
  //     </Switch>
  //     </UserContext.Provider>
  //   </div>
  //   </Router>
  // );
  // */
}

export default App;