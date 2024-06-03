import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ShowMovies from '../components/ShowMovies';
import LoadingEffect from '../components/LoadingEffect';
import Pagination from '../components/Pagination';

export default function Home() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const key = import.meta.env.VITE_TMDB_API;
  const genre = searchParams.get("genre");
  const [moviePage, setMoviePage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://api.themoviedb.org/3${
            genre === "fetchTopRated" ? `/movie/top_rated` : genre === "fetchTrending" ? `/trending/all/week` : `/movie/now_playing`
          }?api_key=${key}&language=en-US&page=${moviePage}`
        );
        const data = await res.json();
        setMovies(data.results);
        setTotalPages(Math.min(data.total_pages,10));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [genre, moviePage]);

  useEffect(() => {
    setMoviePage(1);
  }, [genre]);

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[moviePage])

  if (loading) {
    return (
      <div>
        <LoadingEffect toTranslate={true} />
      </div>
    );
  }

  return (
    <div>
      <ShowMovies movies={movies} />
      
      <div className='flex gap-4 justify-center mt-8 font-semibold'>

      </div>
        <Pagination totalPages={totalPages} moviePage={moviePage} setMoviePage={setMoviePage}/>
      <div>
        <span className='opacity-0 select-none'>🫡</span>
      </div>
    </div>
  );
}
