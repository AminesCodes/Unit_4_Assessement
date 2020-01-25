import React from 'react';
import './App.css';
import {NavLink, Route, Switch} from 'react-router-dom';


import Home from './components/Home';
import Video from './components/Video';
import About from './components/About';
import { ReactComponent as LogoIcon } from './assets/film-solid.svg';


const App = () => {

  return (
    <div className='App position-relative'>
      <nav className='navbar navbar-expand-sm main-navbar navbar-light mb-4'>
        <ul className='navbar-nav'>
        </ul>
        <ul className='navbar-nav'>
          <li className='nav-item float-left' >
            <NavLink className='nav-link' to='/'><LogoIcon className='icon'/>SimpleTube</NavLink>
          </li>
          <li className='nav-item' >
            <NavLink className='nav-link' to='/'>Home</NavLink>
          </li>
          <li className='nav-item' >
            <NavLink className='nav-link' to='/video'>Video</NavLink>
          </li>
          <li className='nav-item' >
            <NavLink className='nav-link' to='/about'>About</NavLink>
          </li>
        </ul>
      </nav>

      <Switch>             
        <Route exact path='/' render={props => (
              <Home 
                handleSearchForm = {this.handleSearchForm}
                inputValue = {this.state.searchTerm}
                handleInputField = {this.handleInputField}
                handleInitSearch = {this.handleInitSearch}
                availableResults = {this.state.availableResults}
                searchResult = {this.state.searchResult}
                {...props} />
          )} />
        <Route path='/video' component={Video} />
        <Route path='/about' component={About} />
      </Switch>
    </div>
  );
}

export default App;
