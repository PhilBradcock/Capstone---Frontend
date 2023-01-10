import './App.css';
import {Route, Routes} from 'react-router-dom';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css'
import fontawesome from 'font-awesome/css/font-awesome.min.css'
import Navbar from './components/Navbar';
import Home from './components/Home';
import Products from './components/Products';
import Product from './components/Product';
// import About from './components/About';
import Contact from './components/Contact';
import Stock from './components/Stock'
import Footer from './components/Footer'
import Login from './components/Login';
import Cart  from './components/Cart';
import { useState } from 'react';
import React from 'react';


export const CurrentUserContext = React.createContext();
export const CartContext = React.createContext();

function App() {

  const [currentUser, setCurrentUser] = useState({})
  const [cart, setAddToCart] = useState([])


  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
    <CartContext.Provider value={{cart, setAddToCart}}>
    <>
      <Navbar />
      <Routes>
        <Route exact path ='/' element={<Home/>} />
        <Route exact path ='/products' element={<Products/>} />
        <Route exact path ='/product/:id' element={<Product/>} />
        {/* <Route exact path ='/about' element={<About/>} /> */}
        <Route exact path ='/contact' element={<Contact/>} />
        <Route exact path ='/stock' element={<Stock/>} />
        <Route exact path ='/login' element={<Login/>} />
        <Route exact path ='/cart' element={<Cart/>} />
      </Routes>
      <Footer />
    </>
    </CartContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
