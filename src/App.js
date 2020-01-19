import React from 'react';
import './App.css';
import {NavLink, Route, Switch} from 'react-router-dom';
import axios from 'axios';

import Home from './components/Home';
import Video from './components/Video';
import About from './components/About';

import API_KEY from './secret'

class App extends React.PureComponent {
  state = {
    search: '',
    searchResult: [],
    availableResults: '',
    alerts: false,
  }

  handleSearchForm = async(event) => {
    event.preventDefault()

    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${this.state.search}&key=${API_KEY}`
      const { data } = await axios.get(url)
      console.log(data)
      this.setState({
        availableResults: data.kind,
        searchResult: data.items,
      })
    } catch (err) {
      console.log(err)
    }
  }

  handleInputField = event => {
    this.setState({search: event.target.value})
  }

  handleInitSearch = () => {
    this.setState({search: ''})
  }

  render() {
    return (
      <div className="App">
        <nav>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/video'>Video</NavLink>
          <NavLink to='about'>About</NavLink>
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
          <Route path='/video' render={props => (
                <Video {...props} />
            )} />
          <Route path='/about' component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;
