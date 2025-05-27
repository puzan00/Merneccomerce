// api/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

import connectDB from '../config/mongodb.js';
import connectCloudinary from '../config/cloudinary.js';
import userRouter from '../routes/userRoute.js';
import productRouter from '../routes/productRoute.js';
import cartRouter from '../routes/cartRoute.js';
import orderRouter from '../routes/orderRoute.js';

dotenv.config();

const app = express();

connectDB();
connectCloudinary();

app.use(cors());
app.use(express.json());

app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

app.get('/', (req, res) => {
  res.json({ msg: 'Welcome to the API' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

export default app;                      // for local
export const handler = serverless(app); // for Vercel
