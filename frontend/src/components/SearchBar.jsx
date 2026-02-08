import React, { useContext, useState, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'

function SearchBar() {
  
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
    const location = useLocation()
    const [visible, setVisible] = useState(false)
    
    useEffect(() => {
        // FIX 1: Pathname Check
        // Ensures the search bar only appears on the Collection page
        if(location.pathname.includes('/collection')){
            setVisible(true)
        }else{
            setVisible(false)
        }
    }, [location])

    // FIX 2: Early Return
    // Cleaner code than wrapping the whole JSX in a ternary operator
    if (!showSearch || !visible) return null;

    return (
    <div className='border-t border-b bg-gray-50 text-center'>
        <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>
            <input 
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                className='flex-1 outline-none bg-inherit text-sm' 
                type='text' 
                placeholder='Search products...' 
            />
            <img className='w-4' src={assets.search_icon} alt='search' />
        </div>
        {/* FIX 3: Added alt tag and margin for better click area */}
        <img 
            onClick={() => setShowSearch(false)} 
            className='inline w-3 cursor-pointer mx-2' 
            src={assets.cross_icon} 
            alt='close search' 
        />
    </div>
  )
}

export default SearchBar