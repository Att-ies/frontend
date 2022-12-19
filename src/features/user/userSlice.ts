import { createSlice } from '@reduxjs/toolkit';

interface userState {
  university: string;
  admissonYear: string;
  email: string;
}
const initialState: userState = {
  university: '',
  admissonYear: '',
  email: '',
};

const userSlice = createSlice({
  name: 'userReducer',
  initialState,
  reducers: {
    setUniversity: (state, action) => ({
      ...state,
      university: action.payload,
    }),
    setAdmissionYear: (state, action) => ({
      ...state,
      admissonYear: action.payload,
    }),
    setEmail: (state, action) => ({ ...state, email: action.payload }),
  },
});

export const { setUniversity, setAdmissionYear, setEmail } = userSlice.actions;
export default userSlice.reducer;
