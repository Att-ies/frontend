import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Artist, User } from 'types/user';

interface userState extends User, Artist {
  isApprovePromotion: boolean;
  isArtist: boolean;
  keywords: string[]; //user
}

const initialState: userState = {
  userId: '',
  password: '',
  email: '',
  nickname: '',
  telephone: '',

  keywords: [], //user

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
    setUserInfo: (state: userState, action: PayloadAction<User>) => ({
      ...state,
      userId: action.payload.userId,
      password: action.payload.password,
      email: action.payload.email,
      nickname: action.payload.nickname,
      telephone: action.payload.telephone,
    }),
    setKeywords: (state: userState, action: PayloadAction<string[]>) => ({
      ...state,
      keywords: action.payload,
    }),
    setArtistInfo: (state: userState, action: PayloadAction<Artist>) => ({
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
  setKeywords,
  setIsApprovePromotion,
  setArtistInfo,
  setIsArtist,
} = userSlice.actions;

export default userSlice.reducer;
