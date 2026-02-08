import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'

const RelatedProducts = ({category, subCategory}) => {
    
    const { products } = useContext(ShopContext)
    const [ related, setRelated ] = useState([])
  
    useEffect(() => {
        if(products && products.length > 0){
            let productsCopy = products.slice();
            
            // Filter by category and subcategory
            productsCopy = productsCopy.filter((item) => category === item.category)
            productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
            
            setRelated(productsCopy.slice(0, 5))
        }
        // FIX 1: Added category and subCategory to dependencies
        // This ensures the list updates when you switch between different products
    }, [products, category, subCategory])

    return (
    <div className='my-24'>
        <div className='text-center text-3xl py-2'>
            <Title text1={'RELATED'} text2={'PRODUCTS'} />
        </div>
        
        {/* FIX 2: Fixed typo 'gap*4' -> 'gap-4' */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {related.map((item) => (
                // FIX 3: Unique Key using item._id
                <ProductItem key={item._id} id={item._id} image={item.image} name={item.name} price={item.price} />
            ))}
        </div>
    </div>
  )
}

export default RelatedProducts