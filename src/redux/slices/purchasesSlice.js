// purchasesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPurchases = createAsyncThunk('purchases/fetchPurchases', async () => {
    const response = await axios.get('/api/purchase');
    return response.data;
});

export const addPurchase = createAsyncThunk('purchases/addPurchase', async ({ product, category, supplier, qty, totalPrice }) => {
    const response = await axios.post('/api/purchase', { product, category, supplier, qty, totalPrice });
    return response.data;
});

const purchasesSlice = createSlice({
    name: 'purchases',
    initialState: { purchases: [], loading: false, hasRun: false },
    reducers: {
        setFunctionHasRun: (state) => {
            state.hasRun = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPurchases.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchPurchases.fulfilled, (state, action) => {
                state.loading = false;
                state.purchases = action.payload.message;
            })
            .addCase(fetchPurchases.rejected, (state) => {
                state.loading = false;
                // Handle rejection if needed
            })
            .addCase(addPurchase.fulfilled, (state, action) => {
                state.hasRun = false
                state.loading = false;
                state.purchases.push(action.payload.message);
            });
    },
});

export default purchasesSlice.reducer;
export const { setFunctionHasRun } = purchasesSlice.actions;