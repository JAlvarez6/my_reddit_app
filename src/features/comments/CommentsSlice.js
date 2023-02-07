import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchComments = createAsyncThunk(
  'Comment/fetchComments',
  async (postID, thunkAPI) => {
    const subreddit = thunkAPI.getState().Posts.SelectedSubreddit

    const response = await fetch(
      `https://www.reddit.com/${subreddit}/comments/${postID}.json`
    )
    const data = await response.json()

    return data
  }
)

export const CommentSlice = createSlice({
  name: 'Comment',
  initialState: {
    Comments: [],
  },
  extraReducers: (builder) => {
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.Comments = action.payload
    })
  },
})

export const selectComments = (state) => state.Comments.Comments

export default CommentSlice.reducer
