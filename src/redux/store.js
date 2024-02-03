// store.js
import { configureStore } from '@reduxjs/toolkit';
import suppliersReducer from './slices/suppliersSlice';
import productsReducer from './slices/productsSlice';
import purchasesReducer from './slices/purchasesSlice';
import salesReducer from './slices/salesSlice';

const store = configureStore({
    reducer: {
        suppliers: suppliersReducer,
        products: productsReducer,
        purchases: purchasesReducer,
        sales: salesReducer,
    },
});

export default store;
