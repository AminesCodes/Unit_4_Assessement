import React from 'react'
import axios from 'axios'


export default class Video extends React.PureComponent {
    render() {
        return (
            <div>
                {this.props.videoId}
            </div>
        )

    }
}