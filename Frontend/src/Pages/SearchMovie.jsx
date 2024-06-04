import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import ShowMovies from '../components/ShowMovies';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingEffect from '../components/LoadingEffect';
import Pagination from '../components/Pagination';

export default function MovieDetails() {
  const {searchTerm}=useParams();
  const key = import.meta.env.VITE_TMDB_API;
  const [movies,setMovies]=useState([]);
  const [loading, setLoading] = useState(true);
  const [moviePage, setMoviePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [loading]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
            `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchTerm}&language=en-US&page=${moviePage}&include_adult=false`
        );
        
        const data = await res.json();
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages,10));
        setLoading(false);
      } catch (error) {
        toast.error("Internal Server Error!");
      }
    };

    fetchData();
  }, [searchTerm,moviePage]);

  if (loading) {
    return <div className='flex items-center justify-center'><LoadingEffect toTranslate={true}/></div>;
    } 
  

  return (

    
    <div>
     {movies &&
        movies.length === 0 &&
        <h1 className='text-center pt-48 text-2xl font-bold text-gray-600 dark:text-slate-50'>No Movies Found!</h1>}
      {movies && <div>
        <ShowMovies movies={movies} />

        <div>
          {movies.length!=0? <Pagination totalPages={totalPages} moviePage={moviePage} setMoviePage={setMoviePage}/> :""}
        </div>
      </div>
        
        }
      <div>
        <span className='opacity-0 select-none'>🫡</span>
      </div>
    </div>
  );
}
