import React from 'react';
import './App.css';
import {NavLink, Route, Switch} from 'react-router-dom'

import Home from './components/Home'
import Video from './components/Video'
import About from './components/About'

class App extends React.PureComponent {
  state = {
    search: '',
    result: []
  }

  handleSearchForm = async(event) => {
    event.preventDefault()
  }

  handleInputField = event => {

  }

  handleInitSearch = () => {

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
          <Route path='/video' render={props => (
                <Video {...props} />
            )} />
          <Route path='/about' component={About} />
          <Route path='/' render={props => (
                <Home 
                  handleSearchForm = {this.handleSearchForm}
                  inputValue = {this.state.search}
                  handleInputField = {this.handleInputField}
                  handleInitSearch = {this.handleInitSearch}
                  {...props} />
            )} />
        </Switch>
      </div>
    );
  }
}

export default App;
