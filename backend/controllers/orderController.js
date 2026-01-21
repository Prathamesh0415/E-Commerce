import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

//global variables
const currency = 'inr'
const deliveryCharges = 10

//gateway stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

// const razorpayInstance = new razorpay({
//     key_id: process.env.RAZORPAY_KEY_ID,
//     key_secret: process.env.RAZORPAY_KEY_SECRET
// })

//COD
export const placeOrder = async (req, res) => {
    try{
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = await orderModel(orderData)
        await newOrder.save()
        
        await userModel.findByIdAndUpdate(userId, {cartData:{}})

    }catch(error){
        console.log(error)
        res.json({success: false, message: "Internal Server Error"})
    }
}

//Stripe
export const placeOrderStripe = async (req, res) => {
    try{
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers        
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = await orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_Data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity 
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_Data: {
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharges*100
            },
            quantity: 1 
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment'
        })

        res.json({success: true, session_url: session.url})

    }catch(error){
        console.log(error)
        res.json({success: false, message: "Internal Server Error"})
    }
}

//Verify Payment stripe
export const verifyStripe = async (req, res) => {
    try{
        const { orderId, success, userId } = req.body
        await orderModel.findByIdAndUpdate(orderId, {payment: true})
        await userModel.findByIdAndUpdate(userId, {cartData:{}})
        res.json({success: true})
    }catch(error){
        console.log("Error in order controller", error)
        res.json({success: false})
    }
}

//RazorPay
export const placeOrderRazorPay = async (req, res) => {

}

//All orders data for admin panel 
export const allOrders = async (req, res) => {
    try{

        const orders = await orderModel.find({})
        res.json({success: true, orders})

    }catch(error){
        console.log("Error in order controller", error)
        res.json({success: false, message: "Internal Server Error"})
    }
}

//User order data for frontend
export const userOrders = async (req, res) => {
    try{
        const { userId } = req.body
        const orders = await orderModel.findById(userId)
        res.json({success: true, orders})
    }catch(error){
        console.log(error, "error in order controller")
        res.json({success: false, message: "Internal Server Error"})
    }
}

//update Status
export const updateStatus = async (req, res) => {
    try{
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success: true, message: "Status Updated"})
    }catch(error){
        console.log("Error in order controller", error)
        res.josn({success: false, message: " Internal Server Error" })
    }
}
