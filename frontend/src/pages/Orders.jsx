import React, { useContext, useState, useEffect } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

function Orders() {
  
  // FIX 1: Added useState and useEffect to imports above
  const { currency, token, backendUrl } = useContext(ShopContext);
  const [ orderData, setOrderData ] = useState([])

  const loadOrderData = async () => {
    try{
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers: {token}})
      if(response.data.success){
        let allOrdersItem = []
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item['status'] = order.status
            // FIX 2: Fixed typo 'paymen' -> 'payment'
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        // FIX 3: Changed .reversed() to .reverse() (Standard JS support)
        setOrderData(allOrdersItem.reverse())
      } 
    }catch(error){
      console.log(error)
    }
  }

  // FIX 4: Added useEffect to trigger the data load
  useEffect(() => {
    loadOrderData()
  }, [token])

  return (
    <div className="border-t pt-10">
      
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      
      <div>
        {orderData.map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div className="flex items-start gap-6 text-sm">
              <img className="w-16 sm:w-20" src={item.image[0]} alt={item.name} />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Size: {item.size}</p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-400">{new Date(item.date).toDateString()}</span>{" "}
                </p>
                <p className="mt-2">
                  {/* FIX 5: Display correct payment method instead of Date */}
                  Payment: <span className="text-gray-400">{item.paymentMethod}</span>{" "}
                </p>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-between">
              <div className="flex items-center gap-2">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                {/* FIX 6: Display dynamic status instead of hardcoded 'Ready to ship' */}
                <p className="text-sm md:text-base">{item.status}</p>
              </div>
              <button onClick={loadOrderData} className="border px-4 py-2 text-sm font-medium rounded-full hover:bg-gray-50">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;