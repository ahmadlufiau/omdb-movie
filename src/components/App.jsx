import React, { Component } from 'react'
import Navbar from './Navbar'
import SearchBar from './SearchBar'
import MovieList from './MovieList'
import axios from 'axios'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movies: [],
            keyword: '',
            totalResults: '',
            page: 2
        }
    }

    onLoadClick = () => {
        axios.get(
            'https://www.omdbapi.com/',
            {
                params: {
                    apikey: '98e9d12',
                    s: this.state.keyword,
                    page: this.state.page
                }
            }
        ).then((res) => {
            if (res.data.Search){
                this.setState(
                    (state) => ({
                        movies: state.movies.concat(res.data.Search),
                        page: state.page + 1
                    })
                )
            }
        })
    }

    onSearchSubmit = (keyword) => {
        axios.get(
            'https://www.omdbapi.com/',
            {
                params: {
                    apikey: '98e9d12',
                    s: keyword
                }
            }
        ).then((res) => {
            this.setState({
                movies: res.data.Search,
                keyword: keyword,
                totalResults: parseInt(res.data.totalResults)
            })
        })
    }

    render(){
        if (this.state.movies === undefined){
            return (
                <div>
                    <Navbar/>
                    <div className="container">
                        <SearchBar func = {this.onSearchSubmit} />
                        <div className="row">
                            <div className="col-12 text-center mt-4 mb-5">
                                No data found
                            </div>
                        </div> 
                    </div> 
                </div>
            )
        } else if (this.state.movies.length === this.state.totalResults ){
            return (
                <div>
                    <Navbar/>
                    <div className="container">
                        <SearchBar func = {this.onSearchSubmit} />
                        <MovieList data = {this.state.movies} />
                        <div className="row">
                            <div className="col-12 text-center mt-4 mb-5">
                                All data loaded
                            </div>
                        </div>  
                    </div>
                </div>
            )
        } else if (this.state.movies.length === 0){
            return (
                <div>
                    <Navbar/>
                    <div className="container">
                        <SearchBar func = {this.onSearchSubmit} />
                    </div>
                </div>
            )
        } else {
            return (
                <div>
                    <Navbar/>
                    <div className="container">
                        <SearchBar func = {this.onSearchSubmit} />
                        <MovieList data = {this.state.movies} />
                        <div className="row">
                            <div className="col-12 text-center mt-4 mb-5">
                                <button type="button" className="btn btn-dark" onClick={this.onLoadClick}>Load More</button>
                            </div>
                        </div>  
                    </div>
                </div>
            )
        }
    }
}

export default App