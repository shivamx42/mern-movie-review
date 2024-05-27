import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ShowMovies from '../components/ShowMovies';

export default function Home() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const key = import.meta.env.VITE_TMDB_API;
  const genre=searchParams.get("genre") || "fetchTrending";

  useEffect(() => {
    const fetchData = async () => {
      try {
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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='min-h-screen'>
      <ShowMovies movies={movies}/>
    </div>
  );
}
