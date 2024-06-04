import React from 'react'
import { Link } from 'react-router-dom';
import "./css/Card.css";

export default function Card({ movie }) {

  const imageUrl = movie.backdrop_path || movie.poster_path
  ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`
  : "https://firebasestorage.googleapis.com/v0/b/movie-review-d1e0e.appspot.com/o/movie-stock.jpg?alt=media&token=cc9ee065-ee36-47d6-9731-774132c5f3ab";
    return (
      <div className='group cursor-pointer rounded-lg border border-slate-400 transition-all duration-400 hover:scale-105 card-container'>
        <Link to={`/movie/${movie.id}`}>
          <img
            src={ imageUrl}
            className='rounded-t-lg card-image-container'
            alt='movie poster'
          ></img>
          <div className='p-2'>
            <p className='line-clamp-2 text-md text-slate-700 dark:text-slate-50'>{movie.overview}</p>
            <h2 className='text-lg font-bold truncate dark:text-white'>
              {movie.title || movie.name}
            </h2>
            
          </div>
        </Link>
      </div>
    );
  }
