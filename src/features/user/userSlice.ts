import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type userInfo = {
  userId: string;
  password: string;
  email: string;
  nickname: string;
  telephone: string;
};
type artistInfo = {
  education: string; //artist
  history: string;
  description: string;
  instagram: string;
  behance: string;
};

interface userState extends userInfo, artistInfo {
  isApprovePromotion: boolean;
  isArtist: boolean;
  tastes: string[]; //user
}

const initialState: userState = {
  userId: '',
  password: '',
  email: '',
  nickname: '',
  telephone: '',

  tastes: [], //user

  education: '', //artist
  history: '',
  description: '',
  instagram: '',
  behance: '',

  isApprovePromotion: false,
  isArtist: false,
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUserInfo: (state: userState, action: PayloadAction<userInfo>) => ({
      ...state,
      userId: action.payload.userId,
      password: action.payload.password,
      email: action.payload.email,
      nickname: action.payload.nickname,
      telephone: action.payload.telephone,
    }),
    setTastes: (state: userState, action: PayloadAction<string[]>) => ({
      ...state,
      tastes: action.payload,
    }),
    setArtistInfo: (state: userState, action: PayloadAction<artistInfo>) => ({
      ...state,
      education: action.payload.education,
      history: action.payload.history,
      description: action.payload.description,
      instagram: action.payload.instagram,
      behance: action.payload.behance,
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

export const {
  setUserInfo,
  setTastes,
  setIsApprovePromotion,
  setArtistInfo,
  setIsArtist,
} = userSlice.actions;

export default userSlice.reducer;
