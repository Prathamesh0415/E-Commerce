import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import { CartTotal } from '../components/CartTotal'

function Cart() {
  
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext)

  const [ cartData, setCartData ] = useState([])
  
  useEffect(() => {
    if(products && products.length > 0){
      const tempData = []
      for(const items in cartItems){
        for (const item in cartItems[items]){
           if (cartItems[items][item] > 0) {
              tempData.push({
                _id: items,
                size: item,
                quantity: cartItems[items][item]
              })
           }
        }
      }
      setCartData(tempData)
    }
    // FIX 1: Added 'products' to dependency array. 
    // Without this, the cart stays empty on page reload because products haven't loaded when this effect first runs.
  }, [cartItems, products])

  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <Title text1={'YOUR'} text2={'CART'} />
      </div>
      <div>
        {
          cartData.map((item, index) => {
            
            const productData = products.find((product) => product._id === item._id)

            // FIX 2: Crash Prevention
            // If productData is undefined (e.g. product deleted from DB but exists in local storage), skip it.
            if (!productData) return null;

            return (
              // FIX 3: Unique Key (combining ID and Size is safer than index)
              <div key={`${item._id}-${item.size}`} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4'>
                <div className='flex items-start gap-6'>
                  <img src={productData.image[0]} alt={productData.name} className='w-16 sm:w-20' />
                  <div>
                    <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                    <div className='flex items-center gap-5 mt-2'>
                      <p>{currency}{productData.price}</p>
                      <p className='px-2 sm:px-3 sm:py-2 border bg-slate-50'>{item.size}</p>
                    </div>
                  </div>
                </div>
                {/* FIX 4: Changed defaultValue to value for controlled input */}
                <input 
                    onChange={(e)=> e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                    className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' 
                    type='number' 
                    min={1} 
                    value={item.quantity} 
                />
                <img onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} className='w-4 mr-5 sm:w-5 cursor-pointer' alt="Remove" />
              </div> 
            )
          })
        }
      </div>
        <div className='flex justify-end my-20'>
          <div className='w-full sm:w-[450px]'>
            <CartTotal />
            <div className='w-full text-end'>
              <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>PROCEED TO CHECKOUT</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Cart