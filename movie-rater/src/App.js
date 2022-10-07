import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails';
import MovieForm from './components/MovieForm'
import { useCookies } from 'react-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import {useFetch} from './hooks/useFetch'

function App() {

  const [movies, setMovies] = useState([])
  const [selectdMovie, setSelectdMovie] = useState(null)
  const [editedMovie, setEditedMovie] = useState(null)
  const [token, setToken, deleteToken] = useCookies(['mr-token'])
  const [data, loading, error] = useFetch()

  useEffect(() => {
    setMovies(data)
  }, [data])

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mr-token']}`
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovies(resp))
    .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    if(!token['mr-token']) window.location.href = '/'
  }, [token])


  const loadMovie = movie => {
    setSelectdMovie(movie)
    setEditedMovie(null)
  }

  const editClicked = movie => {
    setEditedMovie(movie)
    setSelectdMovie(null)
  }

  const updateMovie = movie => {
    const newMovie = movies.map(mov => {
      if(mov.id === movie.id) {
        return movie
      }else {
        return mov
      }
    })
    setMovies(newMovie)
  }

  const newMovie = () => {
    setEditedMovie({title: '', description: ''})
    setSelectdMovie(null)
  }

  const movieCreated = movie => {
    const newMovie = [...movies, movie]
    setMovies(newMovie)
  }

  const removeClicked = movie => {
    const newMovies = movies.filter(mov => mov.id !== movie.id)
    setMovies(newMovies)
  }

  const logoutUser = () => {
    deleteToken(['mr-token'])
  }

  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error loading movies</h1>

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <FontAwesomeIcon icon={faFilm} />
          <span>Movie rater</span>
        </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser} />
      </header>
      <div className='layout'>
        <div>          
          <MovieList movies={movies} movieClicked={loadMovie} editClicked={editClicked} removeClicked={removeClicked} />
          <button onClick={newMovie}>New movie</button>
        </div>
        <MovieDetails movie={selectdMovie} updateMovie={loadMovie} />
        { editedMovie ? <MovieForm movie={editedMovie} updateMovie={updateMovie} movieCreated={newMovie} /> :null }
      </div>
    </div>
  );
}

export default App;
