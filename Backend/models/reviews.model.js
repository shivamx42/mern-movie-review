import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    review:{
        type: String,
        required: true,
    },
    ratings:{
        type: Number,
        required: true,
    },
    userRef: {
        type: String,
        required: true
    },
    movieID:{
      type: String,
      required: true
    },
    submittedBy:{
      type: String,
      required: true
    },
    
  },
  {
    timestamps: true,
  }
);

const Review=mongoose.model('Review',reviewSchema);

export default Review;