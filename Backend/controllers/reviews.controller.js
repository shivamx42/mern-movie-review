import Review from "../models/reviews.model.js";

export const postReviews=async(req,res)=>{
    try {
        const review=await Review.create(req.body);
        return res.status(201).json({message: "Review Added successfully!",review});   
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export const getReviews=async(req,res)=>{
    try {
        const {movieID}=req.params;
        const allReviews=await Review.find({movieID});
        
        return res.status(200).json(allReviews);
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
    }
}

export const deleteReview=async(req,res)=>{
    try {
        await Review.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: "Review Deleted!" });
    
      } catch (error) {
        return res.status(400).json({message: "Internal Server Error"})
      }  
}

export const getUserReviews=async(req,res)=>{
    try {
        const {userID}=req.params;
        const allReviews=await Review.find({userRef: userID});

        return res.status(200).json(allReviews);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error!" });
    }
}