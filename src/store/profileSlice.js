import { createSlice } from '@reduxjs/toolkit';

const initialState = [];
const profileSlice = createSlice({
    name: 'Profile',
    initialState,
    reducers: {
      add(state, action) {
        const existingIndex = state.data.findIndex((item) => item.id === action.payload.id);
        if (existingIndex !== -1) {
          state[existingIndex] = action.payload;
        } else {
          state.data.push(action.payload);
        }
      },
      // ... other reducers ...
    },
  });
  

export const { add } = profileSlice.actions;
export default profileSlice.reducer;
