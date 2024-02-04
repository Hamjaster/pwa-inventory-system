// productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('/api/product');
    return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async ({ title, price, stock }) => {
    const response = await axios.post('/api/product', { title, price, stock });
    return response.data;
});

const productsSlice = createSlice({
    name: 'products',
    initialState: { products: [], loading: false, hasRun: false },
    reducers: {
        setProductsHasRun: (state) => {
            state.hasRun = true;
        },
        setProductsHasNotRun: (state) => {
            state.hasRun = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload.message;
            })
            .addCase(fetchProducts.rejected, (state) => {
                state.loading = false;
                // Handle rejection if needed
            })
            .addCase(addProduct.fulfilled, (state, action) => {
                state.hasRun = false
                state.loading = false;
                state.products.push(action.payload.message);
            });
    },
});

export default productsSlice.reducer;
export const { setProductsHasRun, setProductsHasNotRun } = productsSlice.actions;
