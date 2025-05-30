import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dotenv from "dotenv";
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(cors({
    origin: [
        'https://merneccomerce-frontend.onrender.com',
        'https://merneccomerce-admin.onrender.com'
    ],
    credentials: true
}));

app.use(express.json());

// API routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Root
app.get('/', (req, res) => {
    res.json({ msg: 'Welcome to the API' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});