import React, {useContext, useState, useEffect} from 'react'
import { CartContext } from '../App';

 const Cart = () => {
    
    const {cart, setAddToCart} = useContext (CartContext);
    const [totalPrice, setTotal] = useState(0)

    useEffect(() => {
        setTotal(cart.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0)) //reduce function built in javascript
    },[cart])



  return (
    <div>
        <h1> Cart</h1>
        {/* <h2> {JSON.stringify(cart)}</h2>  */}
        {/* <h2> {JSON.stringify(cart)}</h2> */}
        {/* <h2> {cart[0].title} </h2>   */}
       


        {/* <ul>
            {cart.map(item => {<li> {JSON.stringify(item)}</li>})}
        </ul> */}
        <ol>
            {cart[0] ? cart.map((item) =>  { return <><li> {item.title} - Price: ${item.price}</li> </> }) : null}
        </ol>
        
        <h3> Total: ${totalPrice} </h3>

    </div>
  )
}

export default Cart;

