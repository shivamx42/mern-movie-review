import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


export default function ShowOneReview() {
  const location = useLocation();
  const { userId, review, reviewDate, reviewBy, ratings, imageUrl, movieTitle } = location.state || {};
  const { currentUser } = useSelector(state => state.user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if(location.state==null){
    return (<h1 className='text-center pt-48 text-2xl font-bold text-gray-600 dark:text-slate-50'>Review Not Available!</h1>)
  }

  return (
    
  
    <div className='min-h-screen text-gray-600 dark:text-slate-50 p-4'>
      <div className='max-w-4xl mx-auto mb-4'>
        <img
          src={imageUrl}
          alt={`${movieTitle} Poster`}
          className='rounded-lg w-96 h-60 mb-6 mx-auto border-4 dark:border-slate-100 '
        />
        <h1 className='text-3xl font-bold mb-6 text-center'>{movieTitle}</h1>
        <p className=" bg-slate-50 dark:bg-slate-700 shadow-lg rounded-lg p-8">
          <h2 className='text-2xl font-semibold mb-4'>{reviewBy}'s Review</h2>
          <p className='mb-16 text-lg'> {review}</p>
          <p className='mb-4 text-lg'><strong>Ratings:</strong> {ratings}/5</p>
          <p className='mb-4 text-lg'><strong>Added on:</strong> {reviewDate}</p>
          {currentUser._id === userId && (
            <div className='flex space-x-4 mt-6'>
              <button className='px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300'>Delete Review</button>
            
            </div>
          )}
        </p>
      </div>
    </div>

    
  );
}