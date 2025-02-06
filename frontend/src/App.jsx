import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar  from './components/Navbar'
import Hero from './components/Hero';
import Login from './components/Login'


function App() {

  return (
   <div>
    <Navbar></Navbar>
    <Hero></Hero>
    <Login></Login>
   </div>
   
  )
}

export default App
