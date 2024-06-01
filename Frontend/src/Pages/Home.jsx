import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ShowMovies from '../components/ShowMovies';
import LoadingEffect from '../components/LoadingEffect';


export default function Home() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const key = import.meta.env.VITE_TMDB_API;
  const genre=searchParams.get("genre") || "fetchTrending";


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3${
            genre === "fetchTopRated" ? `/movie/top_rated` : `/trending/all/week`
          }?api_key=${key}&language=en-US&page=1`
        );
        const data = await res.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [genre]);

  if(loading){
    return (
    <div className='min-h-screen flex items-center justify-center -translate-y-28'>
      <LoadingEffect/>
    </div>

    )
  }

  return (
    <div className='min-h-screen'>
      <ShowMovies movies={movies}/>
      <div>
        <span className='opacity-0 select-none'>🫡</span>
      </div>
    </div>
  );
}
