import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'

export const CartTotal = () => {
  
    const { currency, deliveryFee, getCartAmount } = useContext(ShopContext)

    // FIX 1: efficiency
    // Calculate once to avoid calling the function multiple times during render
    const subtotal = getCartAmount();
    const total = subtotal === 0 ? 0 : subtotal + deliveryFee;

    return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1={'CART'} text2={'TOTALS'} />
        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'>
                <p>Subtotal</p>
                {/* FIX 2: Formatting Bug */}
                {/* Replaced manual '.00' string with .toFixed(2) to prevent '10.5.00' errors */}
                <p>{currency} {subtotal}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Shipping Fee</p>
                <p>{currency} {deliveryFee}.00</p>
            </div>
            <hr />
            <div className='flex justify-between'>
                <b>Total</b>
                {/* FIX 3: Math Safety */}
                {/* Ensures floating point addition doesn't create numbers like 100.00000001 */}
                <p>{currency} {total === 0 ? "0.00" : total.toFixed(2)}</p>
            </div>
        </div>
    </div>
  )
}