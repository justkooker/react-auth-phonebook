import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import services from '../../../services/api-service';
import { fetchContacts } from './contactsSlice';

export const phonebookRegister = createAsyncThunk(
  'register',
  async function (user, { rejectWithValue, dispatch }) {
    try {
      const response = await services.fetchSignup(user);
      if (response.status === 201) {
        dispatch(register(response.data));
        dispatch(phonebookLogin(user));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const phonebookLogin = createAsyncThunk(
  'login',
  async function (user, { rejectWithValue, dispatch }) {
    try {
      const response = await services.fetchLogin(user);
      if (response.status === 200) {
        dispatch(login(response.data));
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const phonebookLogout = createAsyncThunk(
  'logout',
  async function (_, { rejectWithValue, dispatch }) {
    try {
      const response = await services.fetchLogout();
      if (response.status === 200) {
        dispatch(logout());
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const phonebookCurrentUser = createAsyncThunk(
  'currentUser',
  async function (token, { rejectWithValue, dispatch }) {
    try {
      const response = await services.fetchCurrentUser(token);
      if (response.status === 200) {
        dispatch(fetchContacts());
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
const registerSlice = createSlice({
  name: 'phonebook',
  initialState: {
    token: '',
    user: {},
    isAuth: false,
  },
  reducers: {
    register(state, action) {
      state.user = action.payload;
    },
    login(state, action) {
      state.isAuth = true;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    logout(state) {
      state.isAuth = null;
      state.token = '';
      state.user = {};
    },
  },
});
export const { register, login, logout } = registerSlice.actions;
export default registerSlice.reducer;
