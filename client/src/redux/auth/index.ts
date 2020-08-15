import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  user: {},
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

export default authSlice;
