import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';

import spinner from '../assets/spinner.gif';

// make the global state available to this page
import { useStoreContext } from "../utils/GlobalState";
// import the particular state functions to the file
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import Cart from '../components/Cart';



function Detail() {
  const [state, dispatch] = useStoreContext();
  // use the useParams Hook to get the id from the url
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({})

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

useEffect(() => {
  // check the state variable for a products array and if there is one...
  if (products.length) {
    // filter by params id
    setCurrentProduct(products.find(product => product._id === id));
  } else if (data) {
    dispatch({
      // else use the data from the QUERY_PRODUCTS query to update the
      // global state object with the products from the query;
      // this triggers a change and the useEffect (above) runs again
      type: UPDATE_PRODUCTS,
      products: data.products
    });
  }
}, [products, data, dispatch, id]);

const addToCart = () => {
  const itemInCart = cart.find((cartItem) => cartItem._id === id);

  if (itemInCart) {
    dispatch({
      type: UPDATE_CART_QUANTITY,
      _id: id,
      purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
    });
  } else {
    dispatch({
      type: ADD_TO_CART,
      product: { ...currentProduct, purchaseQuantity: 1 }
    });
  }
};

const removeFromCart = () => {
  dispatch({
    type: REMOVE_FROM_CART,
    _id: currentProduct._id
  });
};

  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button 
              disabled={!cart.find(p => p._id === currentProduct._id)} 
              onClick={removeFromCart}>Remove from Cart
            </button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
