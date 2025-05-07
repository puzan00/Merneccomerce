import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import dotenv from "dotenv";
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(cors());
app.use(express.json());

// API routes
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
// Root
app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the API' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
