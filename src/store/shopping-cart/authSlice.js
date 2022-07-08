import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// creating initial authorization state
const initialState = {
  signingUp: false,
  signingIn: false,
  user: {},
  error: null,
  registered: false,
  token: localStorage.getItem('token'),
};

export const createUser = createAsyncThunk(
  'auth/createUser',
  async ({ email, password, firstname, lastname }, thunkAPI) => {
    try {
      const res = await fetch('http://localhost:4200/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstname, lastname, email, password}),
      });
      const data = await res.json();
      if (data.error) {
        console.log(data);
        return thunkAPI.rejectWithValue(data.error);
      } else {
        return thunkAPI.fulfillWithValue(data);
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

export const doLogin = createAsyncThunk('auth/doLogin', async (payload, thunkAPI) => {
  try {
    const res = await fetch('http://localhost:4200/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: payload.email, password: payload.password }),
    });
    const data = await res.json();
    console.log(data);
    if (data.error) {
      return thunkAPI.rejectWithValue(data.error);
    } else {
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', data.user);
      return thunkAPI.fulfillWithValue(data);
    }
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUser.pending, (state, action) => {
        state.signingUp = true;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.signingUp = true;
        state.error = null;
        state.registered = true;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.signingUp = false;
        state.error = action.payload;
      })
      .addCase(doLogin.pending, (state, action) => {
        state.signingIn = true;
      })
      .addCase(doLogin.fulfilled, (state, action) => {
        state.signingIn = true;
        state.error = null;
        state.token = action.payload.token;
      })
      .addCase(doLogin.rejected, (state, action) => {
        state.signingIn = false;
        state.error = action.payload;
      });
  },
});

export default authSlice.reducer;
