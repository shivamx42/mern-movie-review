import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';


export default function UserReviews() {

  const navigate=useNavigate();
  const {id}=useParams();
  const handleClick=()=>{
    navigate(`/addReview/${id}`)
  }

  const [reviews,setMovieReviews]=useState([]);

  useEffect(()=>{
    const getReviews=async()=>{
      const res=await fetch(`/api/reviews/getReviews/${id}`);
      if(!res) return;
      const data=await res.json();
      setMovieReviews(data);
    }

    getReviews();
  })

  
  function getDate(dateString){
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

  return (
    <>
      {reviews.length===0?(<div> 
      
      no review found
      <button onClick={handleClick}>Add Review</button>
      
      </div>)
      :(
        <div className="max-w-6xl mx-auto p-4">
      <div className='flex justify-between  border-b-2 border-black mb-4'>
        <h3 className="text-2xl font-bold mb-4">User Reviews</h3>
        <button onClick={handleClick}>Add Review</button>
      </div>
        {reviews.map((review) => (
          <div key={review.id} className="mb-4 p-4 border rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-lg font-semibold">{review.submittedBy}</h4>
              <span className="text-sm text-gray-600">{getDate(review.createdAt)}</span>
            </div>
            <p className="mb-2">{review.review}</p>
            <div className="flex items-center">
              <span className="font-semibold mr-1">Rating:</span>
              <span>{review.ratings} / 5</span>
            </div>
          </div>
        ))}
      </div>
      )}
      
    </>
  );
}
