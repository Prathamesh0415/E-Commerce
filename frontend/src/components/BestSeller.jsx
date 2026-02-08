import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

function BestSeller() {
  
    const { products } = useContext(ShopContext)
    const [bestSeller, setBestSeller] = useState([])

    useEffect(() => {
        // FIX 1: Safety Check
        // Ensure products exists and is an array before filtering/slicing
        // This prevents "Cannot read properties of undefined (reading 'slice')" errors
        if (products && products.length > 0) {
            const bestProduct = products.filter((item) => item.bestseller)
            setBestSeller(bestProduct.slice(0, 5))
        }
    }, [products])
  
    return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLER'} />
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry
            </p>
        </div>
        
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {
                bestSeller.map((item) => {
                    // FIX 2: Unique Key
                    // Changed 'key={index}' to 'key={item._id}' for better React performance and stability
                    return (
                        <ProductItem key={item._id} id={item._id} name={item.name} image={item.image} price={item.price} />
                    )
                })
            }
        </div>

    </div>
  )
}

export default BestSeller