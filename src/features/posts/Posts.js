import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPosts,
  selectLoadingPosts,
  selectPosts,
  selectSelectedSubreddit,
} from './PostsSlice'
import { useNavigate } from 'react-router-dom'
import { SinglePost } from '../../components/SinglePost'

export const Posts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Posts = useSelector(selectPosts)
  const selectSubreddit = useSelector(selectSelectedSubreddit)
  const loading = useSelector(selectLoadingPosts)

  useEffect(() => {
    dispatch(getPosts(selectSubreddit))
  }, [dispatch, selectSubreddit])

  const postClicked = (id) => {
    navigate(`post/${id}`)
  }

  return (
    <div className="posts-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        Posts.map((Post) => {
          return (
            <div
              className="single-post-container"
              onClick={() => postClicked(Post.data.id)}
            >
              <SinglePost key={Post.data.id} Post={Post} />
            </div>
          )
        })
      )}
    </div>
  )
}
