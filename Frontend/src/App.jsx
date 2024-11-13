import React, { useState } from 'react'
import Left from './home/LeftPart/left'
import Right from './home/RightPart/Right'
import Signup from './components/Signup'
import Login from './components/Login'
import { useAuth } from './context/Authprovider'
import { Navigate, Route, Routes } from "react-router-dom"
import Loading from './components/Loading'
import { Toaster } from 'react-hot-toast'

const App = () => {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);

  return (


    <>

      <Routes>
      <Route path='/' element={
         authUser ? (
      // <div className='flex h-screen'>
      //   <Left/>
      //   <Right/>
      // </div> 

      
        <div className="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col items-center justify-center">
            <Right/>
          </div>
          <div className="drawer-side">
            <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu bg-black text-base-content min-h-full w-80">
              <Left/>
            </ul>
          </div>
        </div>
      
    )  : ( <Navigate to={"/login"} /> )
      }/>

      <Route path='/login' element={authUser ? <Navigate to="/"/> : <Login/>}></Route>
      <Route path='/signup' element={authUser ? <Navigate to="/"/> : <Signup/>}></Route>
    </Routes>
    <Toaster/>
    </>

    // <Loading />

  )
}

export default App
