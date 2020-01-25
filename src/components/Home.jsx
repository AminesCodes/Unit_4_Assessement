import React from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import VideoThumbnail from './VideoThumbnail'
import About from './About';
import Errors from './Errors'

import API_KEY from '../secret'

export default class Home extends React.PureComponent {
    state = {
        searchTerm: '',
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
            errorMessage: err
          })
        }
    }

    getSearchResults = async (searchTerm) => {
        if (searchTerm) {
            try {
              const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${searchTerm}&key=${API_KEY}`
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

    componentDidMount() {
        this.getSearchResults((this.props.location.search).split('?$earch=')[1])
    }
    
    handleSearchForm = event => {
        event.preventDefault()

        if (this.state.searchTerm) {
            this.props.history.push(`?$earch=${this.state.searchTerm}`);
            this.getSearchResults(this.state.searchTerm)
        }
    }
    
    handleInputField = event => {
        this.setState({searchTerm: event.target.value})
    }
    
    handleInitSearch = () => {
        this.setState({searchTerm: ''})
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

        let pageContent = 
                <div className='container'>
                    <h3>Search for videos above!</h3>
                    <About />
                </div>
        if (this.state.availableResults) {
          pageContent = this.state.searchResult.map(result => 
            <div className='col-sm-6' key={result.id.videoId+result.snippet.thumbnails.medium.url}>
                <Link className='col-sm-6' to={`/video/${result.id.videoId}`}>
                <VideoThumbnail 
                    url={result.snippet.thumbnails.medium.url}
                    title={result.snippet.title}
                    id={result.id.videoId}
                    />
                </Link>
            </div>
          )
        }
    
        return (
        <div className='container'>
            <div className='container-fluid'>
                <form className='d-flex' onSubmit={this.handleSearchForm}>
                    <div className="input-group mb-3 mr-sm-2 flex-fill">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.state.inputValue}
                            onChange={this.handleInputField} 
                        />
                        <div className="input-group-append">
                            <span 
                                className="input-group-text" 
                                role="img" 
                                aria-label="Close"
                                onClick={this.handleInitSearch}>ⓧ</span>
                        </div>
                    </div>
                    <button className='btn btn-info mb-3 mr-sm-2'><span role="img" aria-label="Search">🔎</span></button>
                </form>
            </div>
            <div className='row'>
                {pageContent}
            </div>
            {errorContainer}
        </div>
        )
    }
}