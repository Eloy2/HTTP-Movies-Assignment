import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link, Redirect } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setUpdate }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const [ sendTo, setSendTo ] = useState(null);

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteMovie = () => {
    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => console.log("res from movie comp", res))
      .catch(err => console.log("Error from movie comp", err))

    setTimeout(() => {
      setUpdate(Date.now);
    }, 50)

    setSendTo("/");
  }

  if (sendTo){
    return <Redirect to={sendTo}/>
  }
  else {
    return (
      <div className="save-wrapper">
        <MovieCard movie={movie} />

        <div className="save-button" onClick={saveMovie}>
          Save
        </div>

        <Link to={`/update-movie/${params.id}`}>
          Edit Movie Info
        </Link>
        <button onClick={deleteMovie} >Delete Movie</button>
      </div>
    );
  }
}

export default Movie;
