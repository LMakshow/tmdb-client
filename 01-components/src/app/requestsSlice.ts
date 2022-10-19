import { createSlice } from '@reduxjs/toolkit';
import { MovieReqData } from 'utils/TMDBinterfaces';

export const requestsSlice = createSlice({
  name: 'requests',
  initialState: { requests: [] as MovieReqData[] },
  reducers: {
    addRequestData: (state, action) => {
      const newRequest = action.payload;
      newRequest.num = state.requests.length + 1;
      state.requests.push(newRequest);
    },
  },
});

export const { addRequestData } = requestsSlice.actions;

export default requestsSlice.reducer;
