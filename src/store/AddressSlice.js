import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], // Initial data is an empty array
  length: 0, // Initial length is 0
};

const AddressSlice = createSlice({
  name: 'Address',
  initialState,
  reducers: {
    add(state, action) {
        state.data = [action.payload]; // Replace old data with new data
        state.length = 1; 
    },
  },
});
export const { add } = AddressSlice.actions;
export default AddressSlice.reducer;
