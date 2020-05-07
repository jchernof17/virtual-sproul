import React, { useState, useContext } from 'react'
import { Menu } from 'semantic-ui-react'
import { Redirect, Link } from 'react-router-dom'
import { UserContext } from '../UserContext';


export const Navbar = () => {
    const [activeItem, setActiveItem] = useState('');
    const {user, setUser} = useContext(UserContext);

    const handleClick = (value) => {
        setActiveItem(value);
        console.log(value);
        return (
        <Redirect to={value}/>
        )
    }
    return (
      <Menu style={{margin:0, borderTop:0}}>
        <Link to={{pathname: "/"}}>
        <Menu.Item header>virtual sproul</Menu.Item>
        </Link>
        <Link to={{pathname: "/about"}}>
        <Menu.Item
          name='aboutUs'
          active={activeItem === 'about'}
          onClick={e => handleClick('about')}
        />
        </Link>
        <Link to={{pathname: "/clubs"}}>
        <Menu.Item
          name='Clubs'
          active={activeItem === 'clubs'}
          onClick={e => handleClick('clubs')}
        />
        </Link>
        <Link to={{pathname: "/events"}}>
        <Menu.Item
          name='events'
          active={activeItem === 'events'}
          onClick={e => {
            handleClick('events')}
          }
        />
        </Link>
        <Link to={{pathname: "/profile"}}>
        <Menu.Item
          name='profile'
          active={activeItem === 'profile'}
          onClick={e => handleClick('profile')}
        />
        </Link>
        { user ? 
          <Link to={{pathname: "/logout"}}>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={e => handleClick('logout')}
          />
          </Link>
          :
          <Link to={{pathname: "/login"}}>
          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={e => handleClick('login')}
          />
          </Link>
        }
      </Menu>
    )
}