import { useState } from "react";
import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate();
  const {loading, handleLogin}  = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await handleLogin({email, password}) 
      navigate('/')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  if(loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <svg
          className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm10 0l3 2.647A7.962 7.962 0 0120 12h-4z"
          ></path>
        </svg>
      </div>
    );
  }

  return (
    <main className="flex flex-col justify-center gap-3 items-center  h-screen neutral-bgc">
      <div className="flex flex-col secondary-bgc gap-2 rounded-lg w-80 p-10">
        <span className="primary-color inline-block font-bold text-sm">
          Craft your legacy
        </span>
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to the Cognitive Atelier
        </h1>
        <form action="" className="flex flex-col gap-5 mt-5 w-full">
          <div className="w-full">
            <label htmlFor="email" className="text-xs font-bold text-gray-400">
              WORK EMAIL
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>{setEmail(e.target.value)}}
              className="neutral-bgc px-3 py-2 text-gray-400 text-sm rounded w-full"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="text-xs font-bold text-gray-400"
            >
              PASSWORD
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => {setPassword(e.target.value)}}
              className="neutral-bgc px-3 py-2 rounded w-full text-gray-400 text-sm"
            />
          </div>
          <button type="button" onClick={handleSubmit} className="primary-bgc rounded-full px-2 text-md hover:bg-black hover:cursor-pointer py-2">Submit</button>
        </form>
      </div>
      <div className="text-sm font-bold text-gray-400">Didn't register? <a className="primary-color" href="/register">Register</a></div>
    </main>
  );
};

export default Login;
