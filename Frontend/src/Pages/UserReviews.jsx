import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingEffect from '../components/LoadingEffect';
import { deleteOrLogoutUser } from "../redux/user/userSlice";
import { toast } from "react-toastify";



export default function UserReviews() {

  const [reviews,setUserReviews]=useState([]);
  const [loading,setLoading]=useState(false);
  const  {currentUser}  = useSelector(state => state.user);
  const userID=currentUser._id

  const navigate=useNavigate();
  const dispatch=useDispatch();

  useEffect(() => {
    const getReviews = async () => {
      setLoading(true);
      const res = await fetch(`/api/reviews/getUserReviews/${userID}`);
      const data = await res.json();
      if (res.status!==200){ 
        toast.error(data.message);
        dispatch(deleteOrLogoutUser());
        return;
      }

      setUserReviews(data);
      setLoading(false);
    };

    getReviews();
  }, []);


  if(loading){
    return <div className="pt-20">
        <LoadingEffect toTranslate={true}/>
    </div>
  }

  function getDate(dateString) {
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }
  
  async function handleShowOneReview(userId, review, reviewDate, reviewBy, ratings, reviewId, movieTitle, movieId) {

 
    navigate('/showReview', {
      state: {
        userId,
        review,
        reviewDate,
        reviewBy,
        ratings,
        reviewId,
        movieTitle,
        movieId,
      }
    });

  }

  return (
    
      <div className="max-w-lg lg:max-w-3xl mx-auto p-8 text-gray-600 dark:text-slate-50">
      {reviews.length === 0 ? (
        <div className="flex flex-col items-center pt-60">
          <p className="text-lg font-medium mb-4">Share your thoughts on your favorite films to see them displayed here!</p>
      
        </div>):
        
        

    (
        <div className="space-y-8">
          <div className="flex justify-between items-center  pb-2 mb-8 ">
            
          </div>
          <div className="flex justify-center mb-4 font-bold text-3xl ">
            {currentUser.userName}'s Reviews
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
    {reviews.map((review) => (
      <div
        key={review._id}
        className="p-6 border border-gray-400 dark:border-slate-400 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105 cursor-pointer bg-[#fbfbfb] dark:bg-[#334155]"
        onClick={() => {
          handleShowOneReview(review.userRef, review.review, getDate(review.createdAt), review.submittedBy, review.ratings, review._id,review.movieTitle,review.movieID);
        }}
      >
      <div className="flex justify-between">
        <div className="text-lg font-semibold mb-2"> 
          {review.movieTitle.length > 12 ? `${review.movieTitle.slice(0, 12)}...` : review.movieTitle}
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-xs">{getDate(review.createdAt)}</p>

      </div>
        <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{review.review}</p>
      </div>
      ))}
      </div>
        </div>
      )}
    </div>
  );
}
