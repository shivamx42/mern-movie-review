import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ShowMovieDetails from '../components/ShowMovieDetails';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return <div>
          <LoadingEffect toTranslate={true}/>
    </div>;
  }
  
  if (movie.success==false) {
    return <div className='font-bold text-2xl text-gray-600 dark:text-slate-50 text-center pt-48'>Movie Not Found!</div>
  }

  return (
    <div className='w-full text-gray-600 dark:text-slate-50'>
      <ShowMovieDetails movie={movie}/>
    </div>
  );
}
