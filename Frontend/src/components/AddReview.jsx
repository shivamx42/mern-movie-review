import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ShowBackground from './ShowBackground';
import { GrClear } from "react-icons/gr";
import { BiLogOut } from "react-icons/bi";
import { Tooltip } from 'react-tooltip'


export default function AddReview() {
  const [review, setReview] = useState('');
  const [ratings, setRatings] = useState(0);
  const {movieID}=useParams();
  const  {currentUser}  = useSelector(state => state.user);
  const userId=currentUser._id;
  const username=currentUser.userName;

  const navigate=useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch(`/api/reviews/postReview/${movieID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({review,ratings,userRef: userId,movieID,submittedBy: username}),
    });
    const data = await res.json();
    if(res.status===201){
      toast.success(data.message);
      navigate(`/movie/${movieID}`, {replace: true})
    }

    else toast.error(data.message);
  };


  return (
    <>
      
      <ShowBackground showBlur={true}>
      <div className="flex justify-center items-center min-h-screen">
        <form 
          className="bg-slate-200 border-2 border-black bg-opacity-80 p-4 rounded-lg shadow-md relative z-10 overflow-hidden mx-3 sm:w-96 md:w-[420px] backdrop-blur-sm"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold mb-6 text-center">{currentUser.userName}, Add Your Review</h2>
          <div className="mb-4">
            <label 
              htmlFor="review" 
              className="block text-slate-950 font-semibold mb-2"
            >
              Your Review
            </label>
            <textarea
              id="review"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-500 transition-shadow resize-none"
              rows="8"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
              row="20"
              maxLength={2000}
              placeholder='Write your review in under 3000 characters'
            />
          </div>
          <div className="mb-6 flex flex-col items-center">
            <label 
              className="block text-slate-950 font-semibold mb-2"
            >
              Rating:
            </label>
            <div className='flex items-center ml-10 gap-6'>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((rate) => (
                <label key={rate} className="flex items-center">
                  <input
                    type="radio"
                    id="ratings"
                    value={rate}
                    className="hidden"
                    checked={ratings === rate}
                    onChange={() => setRatings(rate)}
                  />
                  
                  <span className={`cursor-pointer text-2xl  ${ratings >= rate ? 'text-yellow-300' : 'text-black'}`}>
                    &#9733;
                  </span>
                </label>
                
              ))}
            </div>
              <div className='mt-1 hover:cursor-pointer' onClick={(e)=>setRatings(0)}>
                <div data-tooltip-id="my-tooltip" data-tooltip-content="Clear Rating" >
                  <GrClear />
                </div>
                <Tooltip id="my-tooltip" />
              
              </div>
            </div>
          </div>
          <div className='flex justify-center ml-12 gap-6 items-center'>
            <div className="text-center">
              <button
                type="submit"
                className="bg-slate-600 text-white rounded-lg p-3 uppercase hover:bg-slate-700
              transition-all"
              >
                Submit Review
              </button>
            </div>
            <Link to={`/movie/${movieID}`} className=" translate-x-12 hover:cursor-pointer">
              <div data-tooltip-id="my-tooltip" data-tooltip-content="Go back" >
                <BiLogOut size={20}/>
              </div>
              <Tooltip id="my-tooltip" />
            </Link>

            </div>
        </form>
      </div>
      </ShowBackground>
    </>
      
    
  );
}


