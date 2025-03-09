import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TRegisterData,
  TLoginData,
  updateUserApi
} from '../utils/burger-api';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

import { TUser } from '../utils/types';

interface IUserState {
  user: TUser;
  isAuthChecked: boolean;
  error: string | undefined | null;
}

export const initialState: IUserState = {
  user: {
    email: '',
    name: ''
  },
  isAuthChecked: false,
  error: ''
};

// export const getUserData = createAsyncThunk('user/getuser', getUserApi);
export const getUserData = createAsyncThunk('user/getuser', async () => {
  const accessToken = getCookie('accessToken');
  if (!accessToken) {
    throw new Error('Токен доступа отсутствует');
  }
  const data = await getUserApi();
  return data;
});

export const loginUser = createAsyncThunk(
  'user/login',
  async (userData: TLoginData) => {
    const data = await loginUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const logoutUser = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const registerUser = createAsyncThunk(
  'user/register',
  async (userData: TRegisterData) => {
    const data = await registerUserApi(userData);
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data;
  }
);

export const updateUser = createAsyncThunk('user/update', updateUserApi);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.error = '';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message!;
      });
    builder
      .addCase(loginUser.pending, (state) => {
        state.isAuthChecked = false;
        state.error = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        state.error = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });
    builder
      .addCase(getUserData.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });
    builder
      .addCase(updateUser.pending, (state) => {
        state.error = '';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isAuthChecked = false;
        state.error = action.error.message!;
      });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthChecked = false;
      state.user = { email: '', name: '' };
    });
  },
  selectors: {
    isAuthCheckedSelector: (state: IUserState) => state.isAuthChecked,
    getUser: (state) => state.user,
    getUserName: (state) => state.user?.name,
    getError: (state) => state.error
  }
});

export const { isAuthCheckedSelector, getUser, getUserName, getError } =
  userSlice.selectors;

export const userSliceReducer = userSlice.reducer;

export default userSlice;
