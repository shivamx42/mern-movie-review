import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UserReviews({imageUrl,movieTitle,movieId}) {


  const navigate = useNavigate();
  const { id } = useParams();
  const handleClick = () => {
    navigate(`/addReview/${id}`);
  };

  const [reviews, setMovieReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const res = await fetch(`/api/reviews/getReviews/${id}`);
      if (!res) return;
      const data = await res.json();
      setMovieReviews(data);
    };

    getReviews();
  }, [id]);

  function getDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  function handleShowOneReview(userId,review,reviewDate,reviewBy,ratings,reviewId) {
    
    navigate('/showReview', {
      state: {
        userId,
        review,
        reviewDate,
        reviewBy,
        ratings,
        imageUrl,
        movieTitle,
        reviewId,
        movieId
      }
    });
  }


  return (
    <div className="max-w-lg lg:max-w-3xl mx-auto p-8">
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center">
          <p className="text-lg font-medium mb-4">No reviews found</p>
          <button 
            onClick={handleClick} 
            className="px-4 py-2 border border-slate-500 text-gray-600 dark:text-slate-50 font-semibold rounded-lg transition-transform duration-300 hover:scale-105 hover:text-white hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-opacity-50"
          >
            Add Review
          </button>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="flex justify-between items-center border-b-2 border-black pb-2 mb-8 dark:border-[#F8FAFC]">
            <h3 className="text-2xl font-bold mb-4">User Reviews</h3>
            <button 
              onClick={handleClick} 
              className="px-4 py-2 border border-slate-500 text-gray-600 dark:text-slate-50 font-semibold rounded-lg transition-transform duration-300 hover:scale-105 hover:text-white hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-opacity-50 mb-4"
            >
              Add Review
            </button>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="p-6 border border-gray-400 dark:border-slate-400 rounded-lg shadow-md  transition-transform duration-300 transform hover:scale-105 cursor-pointer bg-[#fbfbfb] dark:bg-[#334155] "
            onClick={() => {
              handleShowOneReview(review.userRef, review.review, getDate(review.createdAt), review.submittedBy, review.ratings, review._id);
            }}
          >
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{review.submittedBy}</h4>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 dark:text-gray-300 mr-1">Rating:</span>
                <span className="text-gray-900 dark:text-gray-100">{review.ratings} / 5</span>
              </div>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{review.review}</p>
          </div>
        ))}
      </div>
    </div>
      )}
    </div>
  );
}