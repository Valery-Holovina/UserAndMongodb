import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiRequest } from '../../api/client'

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const data = await apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials)
      })
      return { token: data.token, email: credentials.email }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

export const registerUser = createAsyncThunk(
  'auth/register',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      await apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify(credentials)
      })
      await dispatch(loginUser(credentials)).unwrap()
      return 'Реєстрація успішна.'
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('categoryAdminToken'),
    email: localStorage.getItem('categoryAdminEmail'),
    status: 'idle',
    error: null
  },
  reducers: {
    logout(state) {
      state.token = null
      state.email = null
      localStorage.removeItem('categoryAdminToken')
      localStorage.removeItem('categoryAdminEmail')
    }
  },
  extraReducers: (builder) => {
    builder
    //login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.token = action.payload.token
        state.email = action.payload.email
        localStorage.setItem('categoryAdminToken', action.payload.token)
        localStorage.setItem('categoryAdminEmail', action.payload.email)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })


      //register
      .addCase(registerUser.pending, (state) => {
  state.status = 'loading'
  state.error = null
            })
        .addCase(registerUser.fulfilled, (state) => {
  state.status = 'succeeded'
        })
        .addCase(registerUser.rejected, (state, action) => {
  state.status = 'failed'
  state.error = action.payload
        })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer