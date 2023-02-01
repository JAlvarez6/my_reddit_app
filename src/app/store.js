import { configureStore } from '@reduxjs/toolkit'
import PostsReducer from '../features/posts/PostsSlice'
import SubredditsReducer from '../features/subreddits_sidebar/SubredditsSlice'

export const store = configureStore({
  reducer: {
    Posts: PostsReducer,
    Subreddits: SubredditsReducer,
  },
})
