import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ShowOneReview() {
  const location = useLocation();
  const { userId, review, reviewDate, reviewBy, ratings,  movieTitle, reviewId, movieId } = location.state || {};
  const { currentUser } = useSelector(state => state.user);
  const checkUserId=currentUser?currentUser._id:null;

  const [imageUrl,setImageUrl]=useState("");
  const [deleteDialogBox,setDeleteDialogBox]=useState(false);
  

  const key = import.meta.env.VITE_TMDB_API;
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      
      const res= await fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US`);
      const data = await res.json();
      const image=`https://image.tmdb.org/t/p/w500${data.backdrop_path || data.poster_path}`;
      setImageUrl(image);
    };

    fetchData();
  }, []);

  console.log({review,movieId,reviewBy,movieTitle})

  if(location.state==null){
    return (<h1 className='text-center pt-48 text-2xl font-bold text-gray-600 dark:text-slate-50'>Review Not Available!</h1>)
  }

  const navigate=useNavigate()
  const handleDelete=async()=>{
    
    const res = await fetch(`/api/reviews/deleteReview/${reviewId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    if(res.status===200){
      toast.success(data.message);
      navigate(`/movie/${movieId}`, { replace: true });
    }
    
    else{
      toast.error(data.message);
    }
    
    if(res.status===200) dispatch(deleteOrLogoutUser());
  }
  return (
    <>
      {deleteDialogBox?(<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-md z-50">
          <Helmet>
            <title>{movieTitle} | FilmGalaxy</title>
          </Helmet>
        <div className="bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-xl font-bold mb-4">Delete Review!</h2>
          <p className="mb-4">Are you sure you want to delete this review?</p>
          <p className="mb-4 mx-10">This action cannot be undone!</p>
          <div className="flex justify-end">
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2"
            >
              Delete
            </button>
            <button
              onClick={(e)=>setDeleteDialogBox(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>) :
    
      (<div>
        <Helmet>
          <title>{movieTitle} | FilmGalaxy</title>
        </Helmet>
        <div className='min-h-screen text-gray-600 dark:text-slate-50 p-4'>
        <div className='max-w-3xl mx-auto mb-4'>
          <img
            src={imageUrl}
            alt={`${movieTitle} Poster`}
            className='rounded-lg w-96 h-60 mb-6 mx-auto border-4 dark:border-slate-100 '
          />
          <h1 className='text-3xl font-bold mb-6 text-center'>{movieTitle}</h1>
          <div className=" bg-slate-50 dark:bg-slate-700 shadow-lg rounded-lg p-8">
            <h2 className='text-2xl font-semibold mb-4'>{reviewBy}'s Review</h2>
            <p className='mb-16 text-lg'> {review}</p>
            <p className='mb-4 text-lg'><strong>Ratings:</strong> {ratings}/5</p>
            <p className='mb-4 text-lg'><strong>Added on:</strong> {reviewDate}</p>
          </div>
        </div>
            {checkUserId === userId && (
              <div className='mt-6 text-center'>
                <button className='px-4 py-2 bg-red-500 text-slate-50 rounded-md hover:bg-red-600 transition duration-300 border-2 border-black dark:border-white dark:border' onClick={(e)=>setDeleteDialogBox(true)}>Delete Review</button>
              
              </div>
            )}
      </div>
      </div>)}
  </>
    
  );
}