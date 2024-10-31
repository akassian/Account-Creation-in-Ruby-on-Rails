import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ApiRoutes } from '../helpers/constants/routes.enum';
import axiosInstance from '../helpers/axios/axiosInstance';

interface CreateAccountState {
  loading: boolean;
  error: { [key: string]: string[] } | null;
  success: boolean;
  token: string | null;
  user: any;
}

const initialState: CreateAccountState = {
  loading: false,
  error: null,
  success: false,
  token: null,
  user: null,
};

export const createAccount = createAsyncThunk(
  'createAccount',
  async (formData: { username: string; password: string; recaptchaToken: string; }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(ApiRoutes.CREATE_ACCOUNT, formData);
      // TODO: move JWT to cookie - as it is more secure
      // JS based JWT storage is vulnerable to XSS attacks
      // localStorage.setItem('jwt', response.data.token);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const createAccountSlice = createSlice({
  name: 'createAccount',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createAccount.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as { [key: string]: string[] };
      });
  },
});

export default createAccountSlice.reducer;