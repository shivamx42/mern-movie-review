import React from 'react'

export default function ShowMovieDetails({movie}) {

  const imageUrl = movie.backdrop_path || movie.poster_path
  ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`
  : "https://firebasestorage.googleapis.com/v0/b/movie-review-d1e0e.appspot.com/o/movie-stock.jpg?alt=media&token=cc9ee065-ee36-47d6-9731-774132c5f3ab";

  return (
    <div className='p-4 md:pt-8 flex flex-col md:flex-row content-center max-w-6xl mx-auto md:space-x-6 text-gray-600 dark:text-slate-50'>
        <img
          src={imageUrl}
          className='rounded-lg w-96 h-60 md:w-[550px] md:h-[300px] mb-4 border-4 dark:border-slate-100 '
        />
        <div className='p-2'>
          <h2 className='text-lg mb-3 font-bold'>
            {movie.title || movie.name}
          </h2>
          <p className='text-lg mb-3 dark:text-slate-50'>{movie.overview}</p>
          <p className='mb-3'>
            <span className='font-semibold mr-1'>Date Released:</span>
            {movie.release_date || movie.first_air_date}
          </p>
         
        </div>
      </div>
  )
}
