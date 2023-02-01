import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSubreddits = createAsyncThunk(
  'Subreddits/fetchSubreddits',
  async () => {
    const response = await fetch('https://www.reddit.com/subreddits.json')
    const data = await response.json()

    return data.data.children
  }
)

export const SubredditsSlice = createSlice({
  name: 'Subreddits',
  initialState: {
    Subreddits: [],
    loadingSubreddits: false,
    errorSubreddits: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubreddits.pending, (state) => {
        state.loadingSubreddits = true
        state.errorSubreddits = false
      })
      .addCase(fetchSubreddits.fulfilled, (state, action) => {
        state.loadingSubreddits = false
        state.errorSubreddits = false
        state.Subreddits = action.payload
      })
      .addCase(fetchSubreddits.rejected, (state) => {
        state.loadingSubreddits = false
        state.errorSubreddits = true
      })
  },
})

export const selectSubreddits = (state) => state.Subreddits.Subreddits

export default SubredditsSlice.reducer
