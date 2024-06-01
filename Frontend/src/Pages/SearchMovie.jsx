import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ShowMovies from '../components/ShowMovies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingEffect from '../components/LoadingEffect';

export default function MovieDetails() {
  const {searchTerm}=useParams();
  const key = import.meta.env.VITE_TMDB_API;
  const [movies,setMovies]=useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchTerm}&language=en-US&page=1&include_adult=false`
        );
        
        const data = await res.json();
        setMovies(data.results);
        setLoading(false);
      } catch (error) {
        toast.error("Internal Server Error!");
      }
    };

    fetchData();
  }, [searchTerm]);

  if (loading) {
    return <div className='min-h-screen flex items-center justify-center -translate-y-28'><LoadingEffect/></div>;
    } 
  

  return (

    
    <div className=' min-h-screen'>
     {movies &&
        movies.length === 0 &&
        <h1 className='text-center pt-52 text-2xl font-bold text-gray-600 dark:text-slate-50'>No Movies found!</h1>}
      {movies && <ShowMovies movies={movies} />}
    </div>
  );
}
