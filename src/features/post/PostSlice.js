import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPost = createAsyncThunk(
  'Post/fetchPost',
  async (id, thunkAPI) => {
    const Posts = thunkAPI.getState().Posts.Posts
    const postData = Posts.filter((Post) => Post.data.id === id)

    return postData
  }
)

export const PostSlice = createSlice({
  name: 'Post',
  initialState: {
    Post: [],
    isLoadingPost: false,
    errorPost: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.isLoadingPost = true
        state.errorPost = false
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.Post = action.payload
        state.isLoadingPost = false
        state.errorPost = false
      })
      .addCase(fetchPost.rejected, (state) => {
        state.isLoadingPost = false
        state.errorPost = true
      })
  },
})

export const selectPost = (state) => state.Post.Post
export const selectLoadingPost = (state) => state.Post.isLoadingPost

export default PostSlice.reducer
