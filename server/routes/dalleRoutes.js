import express from "express";
import * as dotenv from 'dotenv'
import fetch from 'node-fetch';  // You'll need to install this

dotenv.config();

const router = express.Router();
router.route('/').get((req, res) => {
    res.send('Hello from Pollinations AI');
}); 

router.route('/').post(async(req, res) => {
    try {
        const { prompt } = req.body;
        
        const response = await fetch(process.env.AI_API_URL + encodeURIComponent(prompt), {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Pollinations returns the image directly, so we need to convert it to base64

        const imageBuffer = await response.arrayBuffer();
        const base64Image = Buffer.from(imageBuffer).toString('base64');
        
        res.status(200).json({ photo: base64Image });
        
    } catch(error) { 
        console.error('Pollinations Error:', error);
        res.status(500).send({
            message: error.message
        });
    }
});

export default router;