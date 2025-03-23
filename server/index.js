import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Routes


//testing routes
app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.get('/test', (req, res) => {
    res.json({ message: 'Test route working!' });
});


app.use('/api/v1/post', postRoutes);  // This line was missing
app.use('/api/v1/dalle', dalleRoutes);

// Start server
const startServer = async () => {
    try {
        // Connect to MongoDB first
        await connectDB(process.env.MONGODB_URL);
        
        const port = process.env.PORT || 1111;
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
    }
};

startServer();