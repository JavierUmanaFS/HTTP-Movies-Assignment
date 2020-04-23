import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, movies, setMovieList }) {

  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { id } = useHistory();
  const { push } = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = () => {
  
    axios.delete(`http://localhost:5000/api/movies/${match.params.id}`)
    .then(res => {
      const newList = movies.filter( e => {
        return e.id !== Number(match.params.id);
      });
      setMovieList(newList);
      push('/');
      console.log(res,' im the res ')
    })
    .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      <div>
      <button onClick={() => push(`/update-movie/${movie.id}`)}>
        Update
      </button>
      <button onClick={deleteMovie}>Delete</button>
      </div>
    </div>
  );
}

export default Movie;
