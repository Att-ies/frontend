import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userInfo = {
  id: string;
  password: string;
  email: string;
  username: string;
  tel: string;
};
interface userState extends userInfo {
  tastes: string[];
  isApprovePromotion: boolean;
  isAuthor: boolean;
}

const initialState: userState = {
  id: '',
  password: '',
  email: '',
  username: '',
  tel: '',
  tastes: [],
  isApprovePromotion: false,
  isAuthor: false,
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUserInfo: (state: userState, action: PayloadAction<userInfo>) => ({
      ...state,
      id: action.payload.id,
      password: action.payload.password,
      email: action.payload.email,
      username: action.payload.username,
      tel: action.payload.tel,
    }),
    setTastes: (state: userState, action: PayloadAction<string[]>) => ({
      ...state,
      tastes: action.payload,
    }),
    setIsApprovePromotion: (
      state: userState,
      action: PayloadAction<boolean>,
    ) => ({
      ...state,
      isApprovePromotion: action.payload,
    }),
    setIsAuthor: (state: userState, action: PayloadAction<boolean>) => ({
      ...state,
      isAuthor: action.payload,
    }),
  },
});

export const { setUserInfo, setTastes, setIsApprovePromotion, setIsAuthor } =
  userSlice.actions;
export default userSlice.reducer;
