import React from 'react'
import axios from 'axios'

export default class Home extends React.PureComponent {


    render() {
        return (
            <div className='container'>
                <form className='d-flex' onSubmit={this.props.handleSearchForm}>
                    <div className="input-group mb-3 mr-sm-2 flex-fill">
                        <input 
                            type="text" 
                            className="form-control" 
                            value={this.props.inputValue}
                            onChange={this.props.handleInputField} 
                        />
                        <div className="input-group-append">
                            <span className="input-group-text" role="emoji" aria-label="Close">ⓧ</span>
                        </div>
                    </div>
                    <button className='btn btn-info mb-3 mr-sm-2'><span role="emoji" aria-label="Search">🔎</span></button>
                </form>
            </div>
        )
    }
}