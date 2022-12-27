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
    setUserinfo: (state, action) => ({
      ...state,
      id: action.payload.id,
      password: action.payload.password,
      email: action.payload.email,
      username: action.payload.username,
      tel: action.payload.tel,
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

export const { setUserinfo, setTastes, setIsApprovePromotion } =
  userSlice.actions;
export default userSlice.reducer;
