import React from 'react'
import YouTube from 'react-youtube'
import axios from 'axios'

import API_KEY from '../secret'
import Comments from './Comments'


export default class Video extends React.PureComponent {
    state = {
        videoId: '',
        title: '',
        published: '',
        description: '',
    }

    async componentDidMount() {
        const fullUrl = (this.props.location.pathname).split('/')
        const videoId = fullUrl.slice(2).join('/') // IN CASE THE VIDEO ID HAS A '/'
        try {
            const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`
            const {data} = await axios.get(url)
            this.setState({
                videoId: videoId,
                title: data.items[0].snippet.title,
                published: new Date(data.items[0].snippet.publishedAt).toLocaleString(),
                description: data.items[0].snippet.description,
            })
        } catch {

        }
    }


    render() {
        

        const opts = {
          playerVars: {
            autoplay: 0
          }
        };

        let videoContent = null
        let comments = null
        if (this.state.videoId) {
            videoContent = <YouTube
                    videoId={this.state.videoId}
                    opts={opts}
                    className='container'
                    onReady={this._onReady}
                />
            
            comments = <Comments />
        }


     
        return (
            <div className='container'>
                {videoContent}
                <span>{this.state.published}</span>
                <h2>{this.state.title}</h2>
                <p>{this.state.description}</p>
                {comments}
            </div>
        )
    }
     
    _onReady(event) {
        event.target.pauseVideo();
    }
}
