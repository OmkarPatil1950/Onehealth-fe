import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [], // Initial data is an empty array
  length: 0, // Initial length is 0
};
const ScheduleSlice = createSlice({
  name: 'Schedule',
  initialState,
  reducers: {
    add(state, action) {
        state.data = [action.payload]
    },
  },
});

export const { add } = ScheduleSlice.actions;
export default ScheduleSlice.reducer;
