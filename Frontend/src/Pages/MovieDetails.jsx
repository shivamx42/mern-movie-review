import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ShowMovieDetails from '../components/ShowMovieDetails';
import UserReviews from '../components/UserReviews';
import LoadingEffect from '../components/LoadingEffect';


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
    return <div className='min-h-screen flex items-center justify-center -translate-y-28'>
          <LoadingEffect/>
    </div>;
  }
  
  if (movie.success==false) {
    return <div className='min-h-screen font-bold text-2xl text-gray-600 dark:text-slate-50 text-center mt-10'>Movie not found!</div>
  }

  return (
    <div className='w-full min-h-screen text-gray-600 dark:text-slate-50'>
      <ShowMovieDetails movie={movie}/>
      <UserReviews/>
    </div>
  );
}
