import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify'; 
import { useAuth } from './pages/Home/Auth'
const App = () => {

  const { loading } = useAuth();
  const navigate= useNavigate();


  useEffect(()=>{
    onAuthStateChanged(auth, async(user)=>{
      if(user){
        console.log("logged in");
        navigate("/");
      }else{
        console.log("logged out");
        navigate("/login");
      }
    })
  },[])
  if (loading) return <div className="text-white p-4">Loading...</div>; // or a spinner
  return (
    <div>
       <ToastContainer theme='dark'/>
      <Routes>
        <Route path='/' element={<Home/> }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>
      
    </div>
  )
}

export default App