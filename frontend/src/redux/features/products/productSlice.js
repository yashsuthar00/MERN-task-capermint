import { createSlice } from '@reduxjs/toolkit';
import products from '../../../products.json';

const initialState = {
  products: products,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, name, count } = action.payload;
      const existingProduct = state.products.find(product => product.id === id);
      if (existingProduct) {
        existingProduct.name = name;
        existingProduct.count = count;
      }
    },
    incrementCount: (state, action) => {
      const product = state.products.find(product => product.id === action.payload);
      if (product) {
        product.count += 1;
      }
    },
    decrementCount: (state, action) => {
      const product = state.products.find(product => product.id === action.payload);
      if (product && product.count > 0) {
        product.count -= 1;
      }
    }
  }
});

export const { addProduct, updateProduct, incrementCount, decrementCount } = productSlice.actions;
export default productSlice.reducer;
