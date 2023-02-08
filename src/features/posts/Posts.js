import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPosts,
  selectLoadingPosts,
  selectPosts,
  selectSearchTerm,
  selectSelectedSubreddit,
} from './PostsSlice'
import { useNavigate } from 'react-router-dom'
import { SinglePost } from '../../components/SinglePost'
import { backToTop, handleScrollToTop } from '../../utils/backToTop'

export const Posts = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Posts = useSelector(selectPosts)
  const selectSubreddit = useSelector(selectSelectedSubreddit)
  const loading = useSelector(selectLoadingPosts)
  const userInput = useSelector(selectSearchTerm)

  useEffect(() => {
    dispatch(getPosts(selectSubreddit))

    window.addEventListener('scroll', handleScrollToTop)

    return () => window.removeEventListener('scroll', handleScrollToTop)
  }, [dispatch, selectSubreddit, userInput])

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
              key={Post.data.id}
              onClick={() => postClicked(Post.data.id)}
            >
              <SinglePost key={Post.data.id} Post={Post} />
            </div>
          )
        })
      )}

      <button className="backToTop-button" onClick={backToTop}>
        Back to Top
      </button>
    </div>
  )
}
