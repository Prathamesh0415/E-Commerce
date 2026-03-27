import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const currency = 'inr'
const deliveryCharges = 10

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const placeOrder = async (req, res) => {
    try{
        const {  userId, items, amount, address } = req.body
       // console.log(req)
       console.log(req.userId)
        //const userId = req.userId

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
        res.json({success: true, message: "Order placed successfully"})

    }catch(error){
        console.log(error)
        res.json({success: false, message: "Internal Server Error"})
    }
}

export const placeOrderStripe = async (req, res) => {
    try{
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers        
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = await orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity 
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
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

export const verifyStripe = async (req, res) => {
    try{
        const { orderId, success, userId } = req.body
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment: true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})
        }
        res.json({success: true})
    }catch(error){
        console.log("Error in order controller", error)
        res.json({success: false})
    }
}

export const placeOrderRazorPay = async (req, res) => {

}

export const allOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({})
        res.json({success: true, orders})
    }catch(error){
        console.log("Error in order controller", error)
        res.json({success: false, message: "Internal Server Error"})
    }
}

export const userOrders = async (req, res) => {
    try{
        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({success: true, orders})
    }catch(error){
        console.log(error, "error in order controller")
        res.json({success: false, message: "Internal Server Error"})
    }
}

export const updateStatus = async (req, res) => {
    try{
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({success: true, message: "Status Updated"})
    }catch(error){
        console.log("Error in order controller", error)
        res.json({success: false, message: " Internal Server Error" })
    }
}