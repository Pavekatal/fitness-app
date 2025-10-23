import { UserForApiType } from '@/shared-types/sharedTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  currentUser: null | UserForApiType; // | UserAuthType;
  token: string;
};
const initialState: initialStateType = {
  currentUser: null,
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentUser: (state, action: PayloadAction<UserForApiType>) => {
      state.currentUser = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = '';
      localStorage.clear();
    },
  },
});

export const { setCurrentUser, setToken, logout } = authSlice.actions;
export const authSliceReducer = authSlice.reducer;
