import { configureStore } from '@reduxjs/toolkit'
import PostsReducer from '../features/posts/PostsSlice'
import PostReducer from '../features/post/PostSlice'
import SubredditsReducer from '../features/subreddits_sidebar/SubredditsSlice'

export const store = configureStore({
  reducer: {
    Posts: PostsReducer,
    Post: PostReducer,
    Subreddits: SubredditsReducer,
  },
})
