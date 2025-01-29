import {
  ADD_PRODUCT,
  UPDATE_PRODUCT,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
} from '../actions/productActions';

const initialState = {
  products: [
    { id: 1, name: 'Product 1', count: 0 },
    { id: 2, name: 'Product 2', count: 0 },
    // Add more static products as needed
  ],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };
    case INCREMENT_COUNT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, count: product.count + 1 }
            : product
        ),
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload && product.count > 0
            ? { ...product, count: product.count - 1 }
            : product
        ),
      };
    default:
      return state;
  }
};

export default productReducer;
