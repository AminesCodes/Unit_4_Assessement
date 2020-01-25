import React, {useState, useEffect}  from 'react'
import YouTube from 'react-youtube'
import { Link } from 'react-router-dom'
import axios from 'axios'

import API_KEY from '../secret'
import Comments from './Comments'
import Errors from './Errors'


export default function Video (props) {
  const [ videoId, setVideoId ] = useState('')
  const [ title, setTitle ] = useState('')
  const [ published, setPublished ] = useState('')
  const [ description, setDescription ] = useState('')
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

  const getVideoInfo = async (id) => {
    try {
      const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`
      const {data} = await axios.get(url)
      setVideoId(id)
      setTitle(data.items[0].snippet.title)
      setPublished(new Date(data.items[0].snippet.publishedAt).toLocaleString())
      setDescription(data.items[0].snippet.description)
    } catch (err){
      handleError(err)
    }
  }

  useEffect(() => {
        const fullUrl = (props.location.pathname).split('/')
        const video_Id = fullUrl.slice(2).join('/') // IN CASE THE VIDEO ID HAS A '/'

        if (video_Id) {
          getVideoInfo(video_Id)
        }
  }, [])

  const handleAlerts = () => {
      setAlert(false)
      setErrorMessage('')
  }


  let errorContainer = null
  if (alert) {
      errorContainer = <Errors text={errorMessage} handleAlerts={handleAlerts} />
  }

  const opts = {
    playerVars: {
      autoplay: 0
    }
  };

  let videoContent = <p>No Video Selected... Please search for one <Link to='/'>HERE</Link></p>
  let comments = null
  if (videoId) {
      videoContent = <YouTube
              videoId={videoId}
              opts={opts}
              className='container'
              onReady={(event) => { event.target.pauseVideo()}}
          />
      
      comments = <Comments videoId={videoId}/>
  }



  return (
      <div className='container'>
          {videoContent}
          <span className=''>{published}</span>
          <h4>{title}</h4>
          {comments}
          {errorContainer}
          <div style={{height: '100px', overflow: 'scroll'}}>{description}</div>
      </div>
  )
     
    // _onReady(event) {
    //     event.target.pauseVideo();
    // }
}
