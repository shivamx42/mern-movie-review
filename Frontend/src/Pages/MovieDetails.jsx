import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ShowMovieDetails from '../components/ShowMovieDetails';

export default function MovieDetails() {
  const {id}=useParams();
  const key = import.meta.env.VITE_TMDB_API;
  const [movie,setMovie]=useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
            `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`
        );
        
        const data = await res.json();
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className='w-full min-h-screen'>
      <ShowMovieDetails movie={movie}/>
    </div>
  );
}
