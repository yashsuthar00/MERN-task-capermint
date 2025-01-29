import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCount, decrementCount } from '../redux/productSlice';

const ProductList = () => {
  const products = useSelector(state => state.products.products);
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Product List</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - Count: {product.count}
            <button onClick={() => dispatch(incrementCount(product.id))}>+</button>
            <button onClick={() => dispatch(decrementCount(product.id))}>-</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
