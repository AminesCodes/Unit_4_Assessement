import React from 'react'
import YouTube from 'react-youtube'
import { Link } from 'react-router-dom'
import axios from 'axios'

import API_KEY from '../secret'
import Comments from './Comments'
import Errors from './Errors'


export default class Video extends React.PureComponent {
    state = {
        videoId: '',
        title: '',
        published: '',
        description: '',
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

    async componentDidMount() {
        const fullUrl = (this.props.location.pathname).split('/')
        const videoId = fullUrl.slice(2).join('/') // IN CASE THE VIDEO ID HAS A '/'

        if (videoId) {
            try {
                const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
                const {data} = await axios.get(url)
                this.setState({
                    videoId: videoId,
                    title: data.items[0].snippet.title,
                    published: new Date(data.items[0].snippet.publishedAt).toLocaleString(),
                    description: data.items[0].snippet.description,
                })
            } catch (err){
                this.handleError(err)
            }
        }
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

        const opts = {
          playerVars: {
            autoplay: 0
          }
        };

        let videoContent = <p>No Video Selected... Please search for one <Link to='/'>HERE</Link></p>
        let comments = null
        if (this.state.videoId) {
            videoContent = <YouTube
                    videoId={this.state.videoId}
                    opts={opts}
                    className='container'
                    onReady={this._onReady}
                />
            
            comments = <Comments videoId={this.state.videoId}/>
        }


     
        return (
            <div className='container'>
                {videoContent}
                <span className=''>{this.state.published}</span>
                <h4>{this.state.title}</h4>
                {comments}
                {errorContainer}
                <div style={{height: '100px', overflow: 'scroll'}}>{this.state.description}</div>
            </div>
        )
    }
     
    _onReady(event) {
        event.target.pauseVideo();
    }
}
