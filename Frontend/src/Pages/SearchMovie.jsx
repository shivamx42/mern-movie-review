import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ShowMovies from '../components/ShowMovies';

export default function MovieDetails() {
  const {searchTerm}=useParams();
  const key = import.meta.env.VITE_TMDB_API;
  const [movies,setMovies]=useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
        );
        
        const data = await res.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchTerm]);

  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (

    
    <div className=' min-h-screen'>
     {movies &&
        movies.length ===
        <h1 className='text-center pt-6'>No results found</h1>}
      {movies && <ShowMovies movies={movies} />}
    </div>
  );
}
