import mongoose from 'mongoose'

const connectDB = async (url) => {
    await mongoose.connect(`${url}/e-commerce`)
    .then(() => {
        console.log('database connected successfully')
    })
    .catch((error) => {
        console.log('error while connecting to database', error);
    })
}

export default connectDB