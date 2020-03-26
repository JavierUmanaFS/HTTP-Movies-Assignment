import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const UpdateMovie = props => {

  return (
    <div>
      <h2>Update Movie Form</h2>
      <div>
      <form onSubmit>
        <input 
        type="text"/>
         <input 
        type="text"/>
         <input 
        type="text"/>
      </form>
    </div>
    </div>
  )
}

export default UpdateMovie;