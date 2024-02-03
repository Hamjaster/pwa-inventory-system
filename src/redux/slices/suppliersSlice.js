// suppliersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async Thunk for fetching suppliers
export const fetchSuppliers = createAsyncThunk('suppliers/fetchSuppliers', async () => {
    const { data } = await axios.get('/api/supplier');
    return data;
});

const suppliersSlice = createSlice({
    name: 'suppliers',
    initialState: { suppliers: [], loading: false, hasRun: false },
    reducers: {
        setFunctionHasRun: (state) => {
            state.hasRun = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchSuppliers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSuppliers.fulfilled, (state, action) => {
                state.loading = false;
                state.suppliers = action.payload.message;
            })
            .addCase(fetchSuppliers.rejected, (state) => {
                state.loading = false;
                // Handle rejection if needed
            });
    },
});

export default suppliersSlice.reducer;
export const { setFunctionHasRun } = suppliersSlice.actions;

