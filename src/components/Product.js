import React, {useContext, useState, useEffect} from 'react'
import { NavLink, useParams } from 'react-router-dom';
import { CartContext } from '../App';

const Product = () => {

    const {cart, setAddToCart} = useContext (CartContext);

    const routeIdParams = useParams();
    const [product, setProduct] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect (() =>{

        const getProduct = async () => {
            setLoading(true);
            const response = await fetch (`http://localhost:8080/fakestore/item?id=${routeIdParams.id}`)
            // console.log(response)
            setProduct(await response.json());
            setLoading(false);
            console.log(response)
        }
        getProduct();
    }, []);


    const Loading = () => {
        return(
            <>
                Loading...
            </>
        )
    }

    const ShowProduct = () => {
        return (
            <>
                <div className='col-md-6'>
                    {product.length > 0 ? <img src={product[0].image} alt={product[0].title} height="400px" width="400px" />: <h2> Loading...</h2>}
                </div>
               

                {product.length > 0 ? <div className='col-md-6'>
                    <h4 className='text-uppercase text-black-50'>{product[0].category}</h4>
                    <h4>{product[0].title}</h4>
                    <h3 className='display-6 fw-bold my-4'>$ {product[0].price}</h3>
                    <p className='lead'>{product[0].item_description}</p>
                    {/* <button className="btn btn-outline-dark px-4 py-2" onClick={()=> setAddToCart(cartArray.push([product]))}>Add to Cart</button> */}
                    <button className="btn btn-outline-dark px-4 py-2" onClick={()=> setAddToCart([...cart,product[0]])}>Add to Cart</button>



                    <NavLink to="/cart" className="btn btn-dark ms-2 px-3 py-2">Go to Cart</NavLink>
                </div> : <h2> Loading...</h2>}
                
            </>
        )
    }

  return (
    <div>
        <div className='container py-5'>
            <div className='row py-5'>
                {loading ? <Loading/> : <ShowProduct/>}
            </div>
        </div>

    </div>
  )
}

export default Product