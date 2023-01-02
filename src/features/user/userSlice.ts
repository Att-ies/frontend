import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userInfo = {
  userId: string;
  password: string;
  email: string;
  username: string;
  telephone: string;
};
interface userState extends userInfo {
  tastes: string[];
  isApprovePromotion: boolean;
  isArtist: boolean;
}

const initialState: userState = {
  userId: '',
  password: '',
  email: '',
  username: '',
  telephone: '',
  tastes: [],
  isApprovePromotion: false,
  isArtist: false,
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUserInfo: (state: userState, action: PayloadAction<userInfo>) => ({
      ...state,
      id: action.payload.userId,
      password: action.payload.password,
      email: action.payload.email,
      username: action.payload.username,
      tel: action.payload.telephone,
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
    setIsArtist: (state: userState, action: PayloadAction<boolean>) => ({
      ...state,
      isArtist: action.payload,
    }),
  },
});

export const { setUserInfo, setTastes, setIsApprovePromotion, setIsArtist } =
  userSlice.actions;
export default userSlice.reducer;
