import React, { Component } from 'react'

class SearchBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            keyword: ''
        }
    }

    onFormSubmit = (e) => {
        e.preventDefault()
        this.props.func(this.state.keyword)
    }

    onTextChange = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    render() {
        return (
            <div className="row mt-3 justify-content-center">
                <div className="col-8">
                    <form 
                    className="form-group mt-5 mb-5" 
                    onSubmit={this.onFormSubmit}> 
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Type movie title" 
                            onChange={this.onTextChange}
                        />
                    </form>
                </div>
            </div> 
        )
    }
}

export default SearchBar