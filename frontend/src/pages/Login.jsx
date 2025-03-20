import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {

  const [ currentState, setCurrentState] = useState('Sign Up')
  const { setToken, token, navigate, backendUrl } = useContext(ShopContext)

  const [ name, setName ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')

  const onSubmitHandler = async (event) => {
    event.preventDefault()
    //console.log("hello")
    try{
      if(currentState === 'Sign Up'){
      const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
      //console.log(response)
      if(response.data.success){
        setToken(response.data.token)
        localStorage.setItem('token', response.data.token)
      }else{
        toast.error(response.data.message)
      }
    }else{
      const response = await axios.post(backendUrl + '/api/user/login', {email, password})
      //console.log(response)
      if(response.data.success){
        setToken(response)
        
      }
    }
    }catch(error){
      console.log(error)
    }
  }

  useEffect(() => {
    if(token){
      navigate('/')
    }
  }, [token])

  useEffect(() => {
    if(!token && localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    }
  }, [])

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {
        currentState === 'Login' ? null : <input
        onChange={(e) => setName(e.target.value)}
        value={name}
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Name"
        required
      /> 
      }
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        value={email}
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        value={password}
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className=" cursor-pointer">Forgot your password?</p>
        <p className=" cursor-pointer"></p>
        {
          currentState === 'Login' ?
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">Create account</p> : 
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">Login Here</p>
        }
      </div>
      <button type="submit" className="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">
        {currentState}
      </button>
    </form>
  );
}

export default Login;
