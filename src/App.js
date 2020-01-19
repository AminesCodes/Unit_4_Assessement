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
    targetVideoId: '',
    alerts: false,
  }

  handleError = err => {
    console.log(err)
    if (err.response) {
      if (err.response.data.message) {
          // toast.error(err.response.data.message,
          //     { position: toast.POSITION.TOP_CENTER });
      } else {
          // toast.error(`${err.response.data}: ${err.response.status} - ${err.response.statusText}`,
          // { position: toast.POSITION.TOP_CENTER });
          console.log('Error', err);
      }
    } else if (err.message) {
          // toast.error(err.message,
          //     { position: toast.POSITION.TOP_CENTER });
    } else {
          // toast.error('Sorry, an error occurred, try again later',
          //     { position: toast.POSITION.TOP_CENTER });
          // console.log('Error', err);
    }
  }

  handleSearchForm = async(event) => {
    event.preventDefault()

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

  handleInputField = event => {
    this.setState({search: event.target.value})
  }

  handleInitSearch = () => {
    this.setState({search: ''})
  }

  handleVideoSelection = (id) => {
    console.log('VIDEO ID: ',id)
    this.setState({targetVideoId: id})
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
                  handleVideoSelection = {this.handleVideoSelection}
                  {...props} />
            )} />
          <Route path='/video' render={props => (
                <Video 
                  videoId = {this.state.targetVideoId}
                  {...props} />
            )} />
          <Route path='/about' component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;
