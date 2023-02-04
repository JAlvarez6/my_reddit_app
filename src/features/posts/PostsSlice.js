import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const getPosts = createAsyncThunk(
  'Posts/getPosts',
  async (subreddit) => {
    const response = await fetch(`https://www.reddit.com/${subreddit}.json`)
    const data = await response.json()

    return data.data.children
  }
)

export const PostsSlice = createSlice({
  name: 'Posts',
  initialState: {
    Posts: [],
    loadingPosts: false,
    errorPosts: false,
    SelectedSubreddit: 'r/Popular',
  },
  reducers: {
    setSelectedSubreddit: (state, action) => {
      state.SelectedSubreddit = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPosts.pending, (state) => {
        state.loadingPosts = true
        state.errorPosts = false
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.Posts = action.payload
        state.loadingPosts = false
        state.errorPosts = false
      })
      .addCase(getPosts.rejected, (state) => {
        state.loadingPosts = false
        state.errorPosts = true
      })
  },
})

export const selectPosts = (state) => state.Posts.Posts
export const selectSelectedSubreddit = (state) => state.Posts.SelectedSubreddit
export const selectLoadingPosts = (state) => state.Posts.loadingPosts
export const selectPostsError = (state) => state.Posts.errorPosts

export const { setSelectedSubreddit } = PostsSlice.actions

export default PostsSlice.reducer
