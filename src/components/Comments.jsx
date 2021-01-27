import React, {useState, useEffect} from 'react'

import Errors from './Errors'
import { ReactComponent as CommentIcon } from '../assets/comment-alt-regular.svg';

export default function Comments(props) {
    const [ userName, setName ] = useState('')
    const [ commentText, setComment ] = useState('')
    const [ comments, setComments ] = useState([])
    const [ displayComments, setDisplayComments ] = useState(false)
    const [ alert, setAlert ] = useState(false)
    const [ errorMessage, setErrorMessage ] = useState('')

    useEffect(() => {
        // localStorage.clear()
        const commentsArrStr = localStorage.getItem(`${props.videoId}`)
        if (commentsArrStr) {
            const commentStrToArr = commentsArrStr.split('@@##@@')
            const commentArr = commentStrToArr.map(e => JSON.parse(e))
            setComments(commentArr)
        }
    }, []) 

    const handleCommentForm = event => {
        event.preventDefault()

        if (userName && commentText) {
            const comment = {
                name: userName,
                comment: commentText,
            }

            comments.unshift(comment)
            setComments(comments)
            const commentsStrArr = comments.map(e => JSON.stringify(e))
            localStorage.setItem(`${props.videoId}`, commentsStrArr.join('@@##@@'));

            setName('');
            setComment('')
        } else {
            setAlert(true)
            setErrorMessage('Both fields are required')
        }
    }

    const handleAlerts = () => {
        setAlert(false)
        setErrorMessage('')
    }

    const handleShowComments = () => {
        setDisplayComments(!displayComments)
    }
    
    
    let commentsContainer = null
    let commentsContainerStyle = {
        width: '100%',
        position: 'relative'
    }
    if (displayComments) {
        commentsContainer = 
            <>
                <form className='form-inline' onSubmit={handleCommentForm}>
                    <label htmlFor='name' className='mr-sm-2'>Name:</label>
                    <input 
                        type='text' 
                        className='form-control mb-2 mr-sm-2' 
                        id='name' 
                        value={userName}
                        onChange={e => setName(e.target.value)}
                    />
                    <label htmlFor='comment' className='mr-sm-2'>Comment:</label>
                    <input 
                        type='text' 
                        className='form-control mb-2 mr-sm-2' 
                        id='comment' 
                        value={commentText}
                        onChange={e => setComment(e.target.value)}
                    />
                    <button className='btn btn-primary mb-2'>Submit</button>
                </form>

                {comments.map((comment, index) => 
                    <div key={comment.name+comment.comment+index}>
                        <strong>{comment.name}: </strong>
                        <span>{comment.comment}</span>
                    </div>
                )}
            </>
            commentsContainerStyle = {
                width: '80%',
                position: 'absolute',
                top: '40%',
                right: '10%',
                left: '10%'
            }
    }

    let errorMessageDiv = null
    if (alert) {
        errorMessageDiv = <Errors text={errorMessage} handleAlerts={handleAlerts} />
    }

    return (
        <div className='container-fluid float-div' style={commentsContainerStyle}>
            <span className='cursorPointer' onClick={handleShowComments}>
                <CommentIcon className='icon' />
                <span>{comments.length}</span>
            </span>
            {commentsContainer}
            {errorMessageDiv}
        </div>
    )
}