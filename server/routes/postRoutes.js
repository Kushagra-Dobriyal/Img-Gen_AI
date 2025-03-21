import express from "express";
import *as dotenv from 'dotenv'
import {v2 as cloudinary} from 'cloudinary';
import Post from'../mongodb/models/post.js';


dotenv.config();

const router=express.Router();
// It is used to define routes separately from the main Express application (app).

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET,
});


//GET POSTS FROM THE DATABASE
router.route('/').get(async(req,res)=>{
    try {
        const posts=await Post.find({}); 
        console.log("These are the get post errors",posts);
        res.status(200).json({success:true, data: posts});
    } catch (error) {
        res.status(500).json({success:false,message:error});
    }
}); 


//UPLOAD A NEW POST
router.route('/').post(async (req, res) => {
    try {
        const { name, prompt, photo } = req.body;  //coming from frontend
        const base64Image=photo.split(',')[1];//To get the base64 part only
        const photoUrl = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Image}`); //GETTING THE CLOUDINARY OPTIMISED URL

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        }); //making a new post entry in the post model in mongoDb
        

        console.log("These are the post errors",newPost);   
        res.status(201).json({ success: true, data: newPost });

    } catch (error) {
        console.error('Error creating post:', error); // Log the error
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;