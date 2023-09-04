import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], // Initial data is an empty array
  length: 0, // Initial length is 0
};
const RequestSlice = createSlice({
  name: 'Request',
  initialState,
  reducers: {
    add(state, action) {
      state.data.push(action.payload);
      state.length = state.data.length; // Update the length when adding data
    },

    updateLength(state, action) {
      state.length = action.payload; // Set the new length in the state
    },

    // Other reducers...
  },
});

export const { add, updateLength } = RequestSlice.actions;
export default RequestSlice.reducer;
