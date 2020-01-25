import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import VideoThumbnail from './VideoThumbnail'
import About from './About';
import Errors from './Errors'

import API_KEY from '../secret'

export default function Home(props) {
    const [ searchTerm, setSearchTerm ] = useState('')
    const [ searchResult, setSearchResult ] = useState([])
    const [ availableResults, setAvailableResults ] = useState('')
    const [ alert, setAlert ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')
    
    const handleError = err => {
        console.log('ERROR : ', err)
        if (err.response) {
          if (err.response.data.message) {
              setAlert(true)
              setErrorMessage(err.response.data.message)
          } else {
                setAlert(true)
                setErrorMessage(`${err.response.data}: ${err.response.status} - ${err.response.statusText}`)
          }
        } else if (err.message) {
            setAlert(true)
            setErrorMessage(err.message)
        } else {
            setAlert(true)
            setErrorMessage(err)
        }
    }

    const getSearchResults = async (searchTerm) => {
        if (searchTerm) {
            try {
              const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${searchTerm}&key=${API_KEY}`
              const { data } = await axios.get(url)
              
                setAvailableResults(data.kind)
                setSearchResult(data.items)
            } catch (err) {
              handleError(err)
            }
          }
    }

    useEffect(() => {
        getSearchResults((props.location.search).split('?$earch=')[1])
      }, []);
    
    const handleSearchForm = event => {
        event.preventDefault()

        if (searchTerm) {
            props.history.push(`?$earch=${searchTerm}`);
            getSearchResults(searchTerm)
        }
    }
    
    const handleAlerts = () => {
        setAlert(false)
        setErrorMessage('')
    }

    
    let errorContainer = null
    if (alert) {
        errorContainer = <Errors text={errorMessage} handleAlerts={handleAlerts} />
    }

    let pageContent = 
            <div className='container'>
                <h3>Search for videos above!</h3>
                <About />
            </div>
    if (availableResults) {
      pageContent = searchResult.map(result => 
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
            <form className='d-flex' onSubmit={handleSearchForm}>
                <div className="input-group mb-3 mr-sm-2 flex-fill">
                    <input 
                        type="text" 
                        className="form-control" 
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)} 
                    />
                    <div className="input-group-append">
                        <span 
                            className="input-group-text" 
                            role="img" 
                            aria-label="Close"
                            onClick={() => setSearchTerm('')}>ⓧ</span>
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