import React, { Component } from 'react'
import { Modal, ModalBody } from 'reactstrap'
import axios from 'axios'

class MovieList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            modal: false,
            poster: '',
            title: '',
            released: '',
            genre: '',
            director: '',
            actors: '',
            imdbRating : '',
            rated: '',
            runtime: '',
            plot: ''
        }
    }

    toggle = () => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    modalOpen = (imdbID, poster, title) => {
        this.setState({
            poster: poster,
            title: title,
            released: 'Loading data ...',
            genre: 'Loading data ...',
            director: 'Loading data ...',
            actors: 'Loading data ...',
            imdbRating : 'N/A',
            rated: 'Loading data ...',
            runtime: '',
            plot: 'Loading data ...'
        })
        this.toggle()

        axios.get(
            'https://www.omdbapi.com/',
            {
                params: {
                    apikey: '98e9d12',
                    i: imdbID,
                    plot: 'full'
                }
            }
        ).then((res) => {
            this.setState({
                released: res.data.Released,
                genre: res.data.Genre,
                director: res.data.Director,
                actors: res.data.Actors,
                imdbRating : res.data.imdbRating,
                rated: res.data.Rated,
                runtime: res.data.Runtime,
                plot: res.data.Plot
            })
        })
    }

    modal = () => {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle} centered>
                    <ModalBody className="modal-padding">
                        <div className="row">
                            <div className="col-4">
                                <img src={this.state.poster} alt={this.state.title} className="img-fluid"/>
                            </div>
                            <div className="col-8">
                                <h3>{this.state.title}</h3>
                                <div className="row">
                                    <div className="col-8">
                                        <div className="imdb-rated">{this.state.rated}</div>
                                        <div className="imdb-runtime">{this.state.runtime}</div>
                                    </div>
                                    <div className="col-4 text-right">
                                        <img className="imdb-star" src="rating.png"  alt="rating"/>
                                        <div className="imdb-rating">{this.state.imdbRating}</div>
                                        <div className="imdb-rating-divisor">/10</div>
                                    </div>  
                                </div>
                                <div className="row imdb-list">
                                    <div className="col-12 mt-2">
                                        <div className="row">
                                            <div className="col-4 pr-0 text-bold">Release date</div>
                                            <div className="col-8 pl-0">{this.state.released}</div>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-1">
                                        <div className="row">
                                            <div className="col-4 pr-0 text-bold">Genre</div>
                                            <div className="col-8 pl-0">{this.state.genre}</div>
                                        </div>
                                    </div>          
                                    <div className="col-12 mt-1">
                                        <div className="row">
                                            <div className="col-4 pr-0 text-bold">Director</div>
                                            <div className="col-8 pl-0">{this.state.director}</div>
                                        </div>
                                    </div>               
                                    <div className="col-12 mt-1">
                                        <div className="row">
                                            <div className="col-4 pr-0 text-bold">Actors</div>
                                            <div className="col-8 pl-0">{this.state.actors}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 mt-4 mb-4">
                                <div className="plot-description">{this.state.plot}</div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-2 text-right ml-auto">
                                <div className="close-button" onClick={this.toggle}>Close</div>
                            </div>  
                        </div>
                    </ModalBody>
                </Modal>
            </div>
        )
    }

    renderList = () => {
        return this.props.data.map((item) => {
            return (
                <div className="col-xl-2 col-lg-2 col-md-3 col-sm-4 col-6" key={item.imdbID} onClick={() => {this.modalOpen(item.imdbID, item.Poster, item.Title)}}>
                    <div className="card card-size mb-4 card-link">
                        <img src={item.Poster} className="card-image" alt={item.Title}/>
                        <div className="card-body">
                        <h6 className="card-title word-break">{item.Title}</h6>
                        <div className="card-subtitle text-muted">{item.Year}</div>
                        </div>
                    </div>
                </div>
            ) 
        })
    }

    render() {
        return (
            <div className="row">  
                {this.renderList()}
                {this.modal()}
            </div>
        )
    }

}

export default MovieList