import React from 'react'

export default function About(props) {
    return (
        <div className='container mt-5'>
            <h1>About</h1>
            <h3 className='m-5'>Welcome to SimpleTube</h3>
            <p>This is a video app built for searching video contents available on YouTube</p>
            <h5 className='float-left mt-3'>This app uses the YouTube API</h5>
            <h6 className='float-right mt-3'>Developed by Amine</h6>
        </div>
    )
}