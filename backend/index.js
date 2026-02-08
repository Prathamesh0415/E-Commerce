import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/connectDB.js'
import connectCloudinary from './config/coudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app = express();

const PORT = 3000 || process.env.PORT

app.use(express.json());

app.use(cors({
  origin: true, // reflects request origin
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
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
    connectDB(process.env.MONGODB_URI)
    connectCloudinary()
})