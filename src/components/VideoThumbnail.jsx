import React from 'react'

export default function VideoThumbnail(props) {
    return (
        <div onClick={e => props.handleVideoSelection(props.id)}>
            <img src={props.url} alt={props.title}/>
            <p>{props.title}</p>
        </div>
    )
}