import { UserAuthType } from '@/shared-types/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentUser: null | UserAuthType;
};
const initialState: initialStateType = {
  currentUser: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserAuthType>) => {
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.currentUser = null;
      localStorage.clear();
    },
  },
});

export const { setCurrentUser, logout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
