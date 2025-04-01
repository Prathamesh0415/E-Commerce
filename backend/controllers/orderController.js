import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"

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

}

//RazorPay
export const placeOrderRazorPay = async (req, res) => {

}

//All orders data for admin panel 
export const allOrders = async (req, res) => {

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

}
