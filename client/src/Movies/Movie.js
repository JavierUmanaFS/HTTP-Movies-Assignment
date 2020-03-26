import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory, useParams } from 'react-router-dom';
import MovieCard from './MovieCard';
import SavedList from './SavedList';

function Movie({ addToSavedList, movies, setMovieList, savedList, setSavedList }) {
  

  const [movie, setMovie] = useState(null);

  const match = useRouteMatch();
  //const { id } = useParams();
  const history = useHistory();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };



  const routeToEditMovie = () => {
    history.push(`/update-movie/${match.params.id}`);
  };

  const deleteMovie = () => {
    const newSavedList = savedList.filter(e => {
      return e.id !== Number(match.params.id);
    });

    setSavedList(newSavedList);

    axios.delete(`http://localhost:5000/api/movies/${match.params.id}`)
    .then(res => {
      const newList = movies.filter( e => {
        return e.id !== Number(match.params.id);
      });
      setMovieList(newList);
      history.push('/');
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
      <div className='update-button' onClick={routeToEditMovie}>
        Update
      </div>
      <div className='delete-button' onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
