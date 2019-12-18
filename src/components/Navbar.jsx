import React, { Component } from 'react'

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-lg navbar-dark bg-dark">
                <div className="container">
                    <a className="navbar-brand" href="/omdb-movie">OMDb Movie</a>
                </div>
            </nav>
        )
    }
}

export default Navbar