import React, { useState } from "react";

function Login() {

  const [ currentState, setCurrentState] = useState('Sign Up')

  const onSubmitHandler = (event) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={onSubmitHandler} class="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div class="inline-flex items-center gap-2 mb-2 mt-10">
        <p class="prata-regular text-3xl">{currentState}</p>
        <hr class="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {
        currentState === 'Login' ? null : <input
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Name"
        required
        value=""
      /> 
      }
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        value=""
      />
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        value=""
      />
      <div class="w-full flex justify-between text-sm mt-[-8px]">
        <p class=" cursor-pointer">Forgot your password?</p>
        <p class=" cursor-pointer"></p>
        {
          currentState === 'Login' ?
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">Create account</p> : 
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">Login Here</p>
        }
      </div>
      <button class="bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer">
        {currentState}
      </button>
    </form>
  );
}

export default Login;
