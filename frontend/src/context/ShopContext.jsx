import { createContext, useEffect, useState } from "react";
//import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const ShopContext = createContext()

const ShopContextProvider = (props) => {

    const currency = "$"
    const deliveryFee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [ search, setSearch] = useState('')
    const [ showSearch, setShowSearch] = useState(false)
    const [ cartItems, setCartItems ] = useState({})
    const [ products, setProducts ] = useState([])
    const navigate = useNavigate()

    const addToCart = (itemId, size) => {
        
        if(!size){
            toast.error("Select Product Size")
            return 
        }

        let cartData = structuredClone(cartItems)
        
        if(cartData[itemId]){
            if(cartData[itemId][size]){
                cartData[itemId][size] += 1
            }else{
                cartData[itemId][size] = 1
            }
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1;
        }

        setCartItems(cartData)
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems){
            for(const item in cartItems[items]){
                try{
                    totalCount += cartItems[items][item]
                }catch(error){
                    console.log(error)
                }
            }
        }
        return totalCount
    }

    const getProductsData = async () => {
        try{
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            }
        }catch(error){
            console.log(error)
            toast.error(error.message)        
        }
    }

    useEffect(() => {
        getProductsData()
    }, [])
    

    const updateQuantity =  (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems)
        cartData[itemId][size] = quantity
        setCartItems(cartData)
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            const itemInfo = products.find((product) => product._id === items )
            for(const item in cartItems[items]){
                try{
                    totalAmount += itemInfo.price * cartItems[items][item]
                }catch(error){
                    console.log(error)
                }
            }
        }
        return totalAmount
    }

    const value = {
        products, currency, deliveryFee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart,
        getCartCount, updateQuantity,
        getCartAmount,
        navigate
    }

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider
