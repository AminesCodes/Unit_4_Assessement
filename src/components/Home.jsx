import React from 'react'
import { Link } from 'react-router-dom';

import VideoThumbnail from './VideoThumbnail'
import About from './About';

export default function Home(props) {
    let pageContent = 
            <div className='container'>
                <h3>Search for videos above!</h3>
                <About />
            </div>
    if (props.availableResults) {
      pageContent = props.searchResult.map(result => 
        <div className='col-sm-6'>
            <Link className='col-sm-6' to={`/video/${result.id.videoId}`}>
            <VideoThumbnail onClick={e => props.handleVideoSelection(result.id.videoId)}
                key={result.id.videoId+result.snippet.thumbnails.medium.url}
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
            <form className='d-flex' onSubmit={e => props.handleSearchForm(e)}>
                <div className="input-group mb-3 mr-sm-2 flex-fill">
                    <input 
                        type="text" 
                        className="form-control" 
                        value={props.inputValue}
                        onChange={props.handleInputField} 
                    />
                    <div className="input-group-append">
                        <span 
                            className="input-group-text" 
                            role="img" 
                            aria-label="Close"
                            onClick={props.handleInitSearch}>ⓧ</span>
                    </div>
                </div>
                <button className='btn btn-info mb-3 mr-sm-2'><span role="img" aria-label="Search">🔎</span></button>
            </form>
        </div>
        <div className='row'>
            {pageContent}
        </div>
    </div>
    )
}