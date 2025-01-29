import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProduct } from '../redux/features/products/productSlice';

const UpdateProduct = ({ product }) => {
  const [name, setName] = useState(product.name);
  const [count, setCount] = useState(product.count);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id: product.id, name, count: parseInt(count, 10) }));
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Count</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Update Product
      </button>
    </form>
  );
};

export default UpdateProduct;
