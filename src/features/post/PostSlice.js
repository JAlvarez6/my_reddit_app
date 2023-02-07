import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchPost = createAsyncThunk(
  'Post/fetchPost',
  async (id, thunkAPI) => {
    const Posts = thunkAPI.getState().Posts.Posts
    const postData = Posts.filter((Post) => Post.data.id === id)

    return postData
  }
)

export const fetchComments = createAsyncThunk(
  'Post/fetchComments',
  async (postID, thunkAPI) => {
    const subreddit = thunkAPI.getState().Posts.SelectedSubreddit

    const response = await fetch(
      `https://www.reddit.com/${subreddit}/comments/${postID}.json`
    )
    const data = await response.json()

    return data
  }
)

export const PostSlice = createSlice({
  name: 'Post',
  initialState: {
    Post: [],
    Comments: [],
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
      .addCase(fetchComments.pending, (state) => {
        state.isLoadingPost = true
        state.errorPost = false
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.Comments = action.payload
        state.isLoadingPost = false
        state.errorPost = false
      })
      .addCase(fetchComments.rejected, (state) => {
        state.isLoadingPost = false
        state.errorPost = true
      })
  },
})

export const selectPost = (state) => state.Post.Post
export const selectComments = (state) => state.Post.Comments
export const selectLoadingPost = (state) => state.Post.isLoadingPost

export default PostSlice.reducer
