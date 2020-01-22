import React from 'react'

import Errors from './Errors'
import { ReactComponent as CommentIcon } from '../assets/comment-alt-regular.svg';

export default class Comments extends React.PureComponent {
    state = {
        name: '',
        comment: '',
        comments: [],
        displayComments: false,
        alert: false,
        errorMessage: '',
    }

    async componentDidMount() {
        // localStorage.clear()
        const commentsArrStr = localStorage.getItem(`${this.props.videoId}`)
        if (commentsArrStr) {
            const commentStrToArr = commentsArrStr.split('@@##@@')
            const commentArr = commentStrToArr.map(e => JSON.parse(e))
            await this.setState({comments: commentArr})
        }
    }

    handleCommentForm = event => {
        event.preventDefault()

        if (this.state.name && this.state.comment) {
            const comment = {
                "name": this.state.name,
                "comment": this.state.comment,
            }

            const allComments = [...this.state.comments]
            allComments.unshift(comment)
            this.setState({comments: allComments})
            const commentsStrArr = allComments.map(e => JSON.stringify(e))
            localStorage.setItem(`${this.props.videoId}`, commentsStrArr.join('@@##@@'));

            this.setState({
                name: '',
                comment: '',
            })
        } else {
            this.setState({
                alert: true,
                errorMessage: 'Both fields are required'
            })
        }
    }

    handleNameInput = event => {
        this.setState({name: event.target.value})
    }

    handleCommentInput = event => {
        this.setState({comment: event.target.value})
    }


    handleShowComments = () => {
        this.setState({ displayComments: !this.state.displayComments })
    }

    handleAlerts = () => {
        this.setState({
            alert: false,
            errorMessage: ''
        })
    }


    render() {
        let commentsContainer = null
        let commentsContainerStyle = {
            width: '100%',
            position: 'relative'
        }
        if (this.state.displayComments) {
            commentsContainer = 
                <>
                    <form className='form-inline' onSubmit={this.handleCommentForm}>
                        <label htmlFor='name' className='mr-sm-2'>Name:</label>
                        <input 
                            type='text' 
                            className='form-control mb-2 mr-sm-2' 
                            id='name' 
                            value={this.state.name}
                            onChange={this.handleNameInput}
                        />
                        <label htmlFor='comment' className='mr-sm-2'>Comment:</label>
                        <input 
                            type='text' 
                            className='form-control mb-2 mr-sm-2' 
                            id='comment' 
                            value={this.state.comment}
                            onChange={this.handleCommentInput}
                        />
                        <button className='btn btn-primary mb-2'>Submit</button>
                    </form>

                    {this.state.comments.map((comment, index) => 
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

        let errorMessage = null
        if (this.state.alert) {
            errorMessage = <Errors text={this.state.errorMessage} handleAlerts={this.handleAlerts} />
        }

        return (
            <div className='container-fluid float-div' style={commentsContainerStyle}>
                <span className='cursorPointer' onClick={this.handleShowComments}>
                    <CommentIcon className='icon' />
                    <span>{this.state.comments.length}</span>
                </span>
                {commentsContainer}
                {errorMessage}
            </div>
        )
    }
}