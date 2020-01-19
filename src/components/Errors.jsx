import React from 'react'

export default function Errors(props) {
    return (
        <div className='errorDiv'>
            <span className='closeBtn btn btn-danger' onClick={props.handleAlerts}> X </span>
            <p>{props.text}</p>
        </div>
    )
}