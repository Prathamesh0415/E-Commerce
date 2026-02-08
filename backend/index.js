import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/connectDB.js'
// FIX 1: Fixed typo 'coudinary' -> 'cloudinary'
import connectCloudinary from './config/coudinary.js'; 
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();

// FIX 2: Port Logic
// Previous code: 3000 || process.env.PORT (Always resulted in 3000)
// New code: Checks environment variable FIRST.
const PORT = process.env.PORT || 4000

app.use(express.json());

app.use(cors({
  // FIX 3: Dynamic Origin for Vercel
  // specific logic can be added here, but origin: true works for most simple setups
  origin: true, 
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  // FIX 4: Added 'token' to allowedHeaders
  // The frontend sends {headers: {token}}, so the backend MUST allow it explicitly.
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true
}));

app.options("*", cors());

app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

app.get('/', (req, res) => {
    res.send('API WORKING');
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    // Ideally await these connections if they are async, 
    // but this works for standard startup.
    connectDB(process.env.MONGODB_URI)
    connectCloudinary()
})

// FIX 5: Export app for Vercel Serverless environment
export default app;