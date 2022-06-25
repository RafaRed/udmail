import React from 'react'
import Login from '../../components/js/Login'
import "../css/Navbar.css"
function Navbar() {
  return (
    <div className="navbar">
        <p className="logo">UD<span>mail</span></p>
      <Login></Login>
    </div>
  )
}

export default Navbar