import React from 'react'
import { Link } from 'react-router-dom';

export default function Card({ movie }) {
    return (
      <div className='group cursor-pointer sm:hover:shadow-slate-400 sm:shadow-md rounded-lg sm:border sm:border-slate-400 sm:m-2 transition-shadow duration-200'>
        <Link to={`/movie/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/original/${
              movie.backdrop_path 
            }`}
            width={500}
            height={300}
            className='sm:rounded-t-lg group-hover:opacity-75 transition-opacity duration-300'
          ></img>
          <div className='p-2'>
            <p className='line-clamp-2 text-md'>{movie.overview}</p>
            <h2 className='text-lg font-bold truncate'>
              {movie.title || movie.name}
            </h2>
            
          </div>
        </Link>
      </div>
    );
  }