import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useRouteMatch } from 'react-router-dom';
import axios from 'axios';


const initialItem = {
  title: '',
  director: '',
  metascore: ''
};

const UpdateMovie = props => {

  const [movie, setMovie] = useState(initialItem);

  //const { id } = useParams();
  const history = useHistory();
  const  match  = useRouteMatch();

  const handleChange = e => {
    e.persist();
    let value = e.target.value;
    if(e.target.name === 'metascore') {
      value = parseInt(value);
    }

    setMovie({
      ...movie,
      [e.target.name]: value
    });

  };

  useEffect(() => {

    const movieToUpdate = props.movies.find
    (e => e.id === Number(match.params.id)
    );
    if(movieToUpdate) {
      setMovie(movieToUpdate);
    }
  }, [props.movies, match.params.id]);

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/movies/${match.params.id}`, movie)
    .then(res => {
      const newList = props.movies.map(e => {
        if (e.id === Number(match.params.id)) {
          return movie;
        } else {
          return e;
        }
      });
      props.setMovieList(newList);
      console.log(res);
      setMovie(initialItem);
      history.push('/');
    })
    .catch(err => console.log(err));
  };
  
console.log('props', props)

  return (
    <div>
      <h2>Update Movie Form</h2>
      <div>
      <form onSubmit={handleSubmit}>
        <input 
        type="text"
        name='title'
        placeholder='title'
        value={movie.title}
        onChange={handleChange}
        />
         <input 
        type="text"
        name='director'
        placeholder='director'
        value={movie.director}
        onChange={handleChange}
        />
         <input 
        type="number"
        name='metascore'
        placeholder='metascore'
        value={movie.metascore}
        onChange={handleChange}
        />
        <button>Update</button>
      </form>
    </div>
    </div>
  )
}

export default UpdateMovie;