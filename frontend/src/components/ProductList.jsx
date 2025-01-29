import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementCount, decrementCount } from '../redux/features/products/productSlice';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';

const ProductList = () => {
  const products = useSelector(state => state.products.products) || [];
  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <AddProduct />
      {selectedProduct && <UpdateProduct product={selectedProduct} />}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>Count: {product.count}</p>
            <div className="flex space-x-2 mt-2">
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded"
                onClick={() => dispatch(incrementCount(product.id))}
              >
                Increment
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => dispatch(decrementCount(product.id))}
              >
                Decrement
              </button>
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => setSelectedProduct(product)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
