import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SignatureState {
  signature: string;
}

const initialState: SignatureState = {
  signature: '',
};

const userSlice = createSlice({
  name: 'signatureReducer',
  initialState,
  reducers: {
    setSignature: (state: SignatureState, action: PayloadAction<string>) => ({
      ...state,
      signature: action.payload,
    }),
  },
});

export const { setSignature } = userSlice.actions;

export default userSlice.reducer;
