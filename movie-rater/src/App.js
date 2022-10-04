import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList'
import MovieDetails from './components/MovieDetails';
import MovieForm from './components/MovieForm'
import Auth from './components/Auth'

function App() {

  const [movies, setMovies] = useState([])
  const [selectdMovie, setSelectdMovie] = useState(null)
  const [editedMovie, setEditedMovie] = useState(null)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/movies/", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token be7620259c170ae45df8924770acdab9be02ac3d'
      }
    })
    .then(resp => resp.json())
    .then(resp => setMovies(resp))
    .catch(error => console.log(error))
  }, [])

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

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie rater</h1>
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
