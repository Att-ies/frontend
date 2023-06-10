import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TokenState {
  accessToken: string | undefined;
}

const initialState: TokenState = {
  accessToken: '',
};

const userSlice = createSlice({
  name: 'tokenReducer',
  initialState,
  reducers: {
    setAccessToken: (state: TokenState, action: PayloadAction<TokenState>) => ({
      ...state,
      accessToken: action.payload.accessToken,
    }),
  },
});

export const { setAccessToken } = userSlice.actions;

export default userSlice.reducer;
