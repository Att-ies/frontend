import { createSlice } from '@reduxjs/toolkit';

interface userState {
  id: string;
  password: string;
  email: string;
  username: string;
  tel: string;
  tastes: string[];
  isApprovePromotion: boolean;
}
const initialState: userState = {
  id: '',
  password: '',
  email: '',
  username: '',
  tel: '',
  tastes: [],
  isApprovePromotion: false,
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setId: (state, action) => ({
      ...state,
      Id: action.payload,
    }),
    setPassword: (state, action) => ({
      ...state,
      password: action.payload,
    }),
    setEmail: (state, action) => ({
      ...state,
      email: action.payload,
    }),
    setUsername: (state, action) => ({
      ...state,
      username: action.payload,
    }),
    setTel: (state, action) => ({
      ...state,
      tel: action.payload,
    }),
    setTastes: (state, action) => ({
      ...state,
      tastes: action.payload,
    }),
    setIsApprovePromotion: (state, action) => ({
      ...state,
      isApprovePromotion: action.payload,
    }),
  },
});

export const {
  setId,
  setPassword,
  setEmail,
  setUsername,
  setTel,
  setTastes,
  setIsApprovePromotion,
} = userSlice.actions;
export default userSlice.reducer;
