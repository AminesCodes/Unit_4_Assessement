import React from 'react';
import './App.css';
import {NavLink, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import Video from './components/Video';
import About from './components/About';
import Errors from './components/Errors'
import { ReactComponent as LogoIcon } from './assets/film-solid.svg';

import API_KEY from './secret'

class App extends React.PureComponent {
  state = {
    search: '',
    searchResult: [],
    availableResults: '',
    alert: false,
    errorMessage: '',
  }

  handleError = err => {
    console.log('ERROR : ', err)
    if (err.response) {
      if (err.response.data.message) {
        this.setState({
          alert: true,
          errorMessage: err.response.data.message
        })
      } else {
        this.setState({
          alert: true,
          errorMessage: `${err.response.data}: ${err.response.status} - ${err.response.statusText}`
        })
      }
    } else if (err.message) {
      this.setState({
        alert: true,
        errorMessage: err.message
      })
    } else {
      this.setState({
        alert: true,
        errorMessage: err.message
      })
    }
  }

  handleSearchForm = async(event) => {
    event.preventDefault()

    if (this.state.search) {
      try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${this.state.search}&key=${API_KEY}`
        const { data } = await axios.get(url)
        this.setState({
          availableResults: data.kind,
          searchResult: data.items,
        })
      } catch (err) {
        this.handleError(err)
      }
    }
  }

  handleInputField = event => {
    this.setState({search: event.target.value})
  }

  handleInitSearch = () => {
    this.setState({search: ''})
  }

  handleAlerts = () => {
    this.setState({
        alert: false,
        errorMessage: ''
    })
}

  render() {
    let errorContainer = null
        if (this.state.alert) {
            errorContainer = <Errors text={this.state.errorMessage} handleAlerts={this.handleAlerts} />
        }

    return (
      <div className='App position-relative'>
        <nav className='navbar navbar-expand-sm main-navbar navbar-light mb-4'>
          <ul className='navbar-nav'>
          </ul>
          <ul className='navbar-nav'>
            <li className='nav-item float-left' >
              <NavLink className='nav-link' to='/'><LogoIcon className='icon'/></NavLink>
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
                  inputValue = {this.state.search}
                  handleInputField = {this.handleInputField}
                  handleInitSearch = {this.handleInitSearch}
                  availableResults = {this.state.availableResults}
                  searchResult = {this.state.searchResult}
                  {...props} />
            )} />
          <Route path='/video' component={Video} />
          <Route path='/about' component={About} />
        </Switch>
        {errorContainer}
      </div>
    );
  }
}

export default App;
