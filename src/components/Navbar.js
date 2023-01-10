import React from 'react'
import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import { CurrentUserContext } from '../App';
import { CartContext } from '../App';


function Navbar () {
const {cart, setAddToCart} = useContext (CartContext);
const {setCurrentUser} = useContext (CurrentUserContext);
console.log(cart)

// Admin access to Stock page

  const stock =  <li className="nav-item" key="5"> <NavLink className="nav-link active" to="/stock">Stock</NavLink></li>
  const currentUserString = localStorage.getItem('currentUser');
  const currentUser = JSON.parse(currentUserString);

  // YOU NEED TO DO MANUAL REFRESH FOR STOCK PAGE TO DISAPPEAR

const loggingOff = () => {
  localStorage.removeItem('currentUser');
  setCurrentUser (null)
console.log(currentUser)
}


  return (
    <div>
        {/* Increased size of Navbar (py-3) - Changed background to white and added a shadow effect*/}
      <nav className="navbar navbar-expand-lg bg-light bg-white py-3 shadow-sm">
  <div className="container">
    <h1 className="navbar-brand fw-bold fs-4">FAKE STORE COLLECTION</h1>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
        <li className="nav-item" key="1">
          <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
        </li>
        <li className="nav-item" key="2">
          <NavLink className="nav-link active" to="/products">Products</NavLink>
        </li>
        {/* <li className="nav-item" key="3">
          <NavLink className="nav-link active" to="/about">About</NavLink>
        </li> */}
        <li className="nav-item" key="4">
          <NavLink className="nav-link active" to="/contact">Contact</NavLink>
        </li>
       
        {currentUser && currentUser.UserAdmin ? stock : null}
        {/* {currentUser && currentUser.UserAdmin ? <li className="nav-item" key="5"> null <NavLink className="nav-link active" to="/stock">Stock</NavLink></li> : null} */}
        
       
      </ul>
       {/* Updated icons using Font Awesome Icons */}
      <div className="buttons">
        <NavLink to="/login" className='btn btn-outline-dark'>
            <i className='fa fa-sign-in me-1'></i> Login</NavLink>
        <NavLink to="/" className='btn btn-outline-dark'>
            <i className='fa fa-sign-out ms-2' onClick={loggingOff}></i> Logout</NavLink>
        <NavLink to="/cart" className='btn btn-outline-dark'>
            <i className='fa fa-shopping-cart ms-2'></i> Cart ({cart.length})</NavLink>
      </div>
    </div>
  </div>
</nav>  
    </div>
  )
}

export default Navbar

// References: https://fontawesome.com/v4/icons/ & https://getbootstrap.com/docs/4.0/components/navbar/ 