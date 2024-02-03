// salesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
    const response = await axios.get('/api/sale');
    return response.data;
});

export const addSale = createAsyncThunk('sales/addSale', async ({ product, category, customer, qty, totalPrice }) => {
    try {
        const response = await axios.post('/api/sale', { product, category, customer, qty, totalPrice });
        return response.data;
    } catch (error) {
        throw error
    }
});

const salesSlice = createSlice({
    name: 'sales',
    initialState: { sales: [], loading: false, hasRun: false, error: "" },
    reducers: {
        setFunctionHasRun: (state) => {
            state.hasRun = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSales.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSales.fulfilled, (state, action) => {
                state.loading = false;
                state.sales = action.payload.message;
            })
            .addCase(fetchSales.rejected, (state, action) => {
                state.loading = false;
                // Handle rejection if needed
            })
            .addCase(addSale.fulfilled, (state, action) => {
                state.hasRun = false
                state.loading = false;
                state.sales.push(action.payload.message);
            });
    },
});

export default salesSlice.reducer;
export const { setFunctionHasRun } = salesSlice.actions;
