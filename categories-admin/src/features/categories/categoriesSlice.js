
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apiRequest } from '../../api/client'

export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token

      return await apiRequest('/categories', { token })
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status
      })
    }
  }
)

export const createCategory = createAsyncThunk(
  'categories/create',
  async (category, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token

      return await apiRequest('/categories', {
        method: 'POST',
        token,
        body: JSON.stringify(category)
      })
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status
      })
    }
  }
)

export const updateCategory = createAsyncThunk(
  'categories/update',
  async (category, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token

      return await apiRequest(`/categories/${category._id}`, {
        method: 'PATCH',
        token,
        body: JSON.stringify({
          name: category.name,
          imageSrc: category.imageSrc
        })
      })
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status
      })
    }
  }
)

export const deleteCategory = createAsyncThunk(
  'categories/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.token

      await apiRequest(`/categories/${id}`, {
        method: 'DELETE',
        token
      })

      return id
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.status
      })
    }
  }
)

const initialState = {
  items: [],
  status: 'idle',
  error: null,
  errorStatus: null
}

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategoriesError(state) {
      state.error = null
      state.errorStatus = null
    },

    clearCategories(state) {
      state.items = []
      state.status = 'idle'
      state.error = null
      state.errorStatus = null
    }
  },

  extraReducers: (builder) => {
    builder
      // Fetch succeeded
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        state.error = null
        state.errorStatus = null
      })

      // Create succeeded
      .addCase(createCategory.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
        state.error = null
        state.errorStatus = null
      })

      // Update succeeded
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        )

        if (index !== -1) {
          state.items[index] = action.payload
        }

        state.error = null
        state.errorStatus = null
      })

      // Delete succeeded
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item._id !== action.payload
        )
        state.error = null
        state.errorStatus = null
      })

      // Pending
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading'
        state.error = null
        state.errorStatus = null
      })
      .addCase(createCategory.pending, (state) => {
        state.error = null
        state.errorStatus = null
      })
      .addCase(updateCategory.pending, (state) => {
        state.error = null
        state.errorStatus = null
      })
      .addCase(deleteCategory.pending, (state) => {
        state.error = null
        state.errorStatus = null
      })

      // Failed
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          action.payload?.message ||
          action.error.message ||
          'Не вдалося завантажити категорії.'
        state.errorStatus = action.payload?.status ?? null
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.error =
          action.payload?.message ||
          action.error.message ||
          'Не вдалося створити категорію.'
        state.errorStatus = action.payload?.status ?? null
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.error =
          action.payload?.message ||
          action.error.message ||
          'Не вдалося оновити категорію.'
        state.errorStatus = action.payload?.status ?? null
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.error =
          action.payload?.message ||
          action.error.message ||
          'Не вдалося видалити категорію.'
        state.errorStatus = action.payload?.status ?? null
      })
  }
})

export const {
  clearCategoriesError,
  clearCategories
} = categoriesSlice.actions

export default categoriesSlice.reducer
