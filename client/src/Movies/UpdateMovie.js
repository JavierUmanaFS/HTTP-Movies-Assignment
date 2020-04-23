import React, { useState, useEffect } from 'react';
import { useHistory, useParams, useRouteMatch } from 'react-router-dom';
import axios from 'axios';


  const initialItem = {
    id:'',
    title:'',
    director:'',
    metascore:'',
    stars: []
  };

const UpdateMovie = props => {
const [movie, setMovie ] = useState(initialItem);

const { push } = useHistory();
const match = useRouteMatch();


const changeHandler = e => {
  e.persist();
  let value = e.target.value;
   if(e.target.name === 'metascore'){
     value = parseInt(value, 10);
   }
  
   setMovie({
     ...movie,
     [e.target.name]: value
   });
};

useEffect(() => {
  const movieToUpdate = props.movies.find(e => {
    return e.id === Number(match.params.id)
  });
  if(movieToUpdate){
    setMovie(movieToUpdate);
  }
}, [props.movies, match.params.id])

const handleSubmit = e => {
  e.preventDefault();
  axios
  .put(`http://localhost:5000/api/movies/${match.params.id}`, movie)
  .then(res => {
    const newList = props.movies.map(e => {
      if(e.id === Number(match.params.id)){
        return movie;
      } else {
        return e;
      }
    });
    props.setMovieList(newList);
    setMovie(initialItem);
    push('/');
  })
  .catch(err => console.log(err))
}



// const changeHandlerArr = e => {
//   e.persist();

//   let arrValue =  e.target.value;
 
//   setMovie({
//     stars: [[...movie.stars], arrValue]}
//     )
// }

  return(
    <div>
      <h1>movie</h1>
      <div>
        <form onSubmit={handleSubmit}>
        <label>
        <h2>ID:</h2>
          <input 
          type="number"
          name='id'
          onChange={changeHandler}
          value={movie.id}
          />  
        </label>
        <label>
        <h2>Title</h2>
          <input 
          type="text"
          name='title'
          onChange={changeHandler}
          value={movie.title}
          />  
        </label>
        <label>
        <h2>Director:</h2>
          <input 
          type="text"
          name='director'
          onChange={changeHandler}
          value={movie.director}
          />  
        </label>
        <label>
        <h2>Metascore:</h2>
          <input 
          type="number"
          name='metascore'
          onChange={changeHandler}
          value={movie.metascore}
          />  
        </label>
       {/* <label>
        <h2>Stars:</h2>
          <input 
          type="text"
          name='stars'
          onChange={changeHandlerArr}
          value={movie.stars}
          />
        </label> */}
        <button>Update</button>
        </form>
      </div>
    </div>
  )
}

export default UpdateMovie;