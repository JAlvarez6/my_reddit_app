import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, selectPosts, selectSelectedSubreddit } from './PostsSlice'
import { formatTimeAgo } from '../../utils/formatTimeAgo'

export const Posts = () => {
  const dispatch = useDispatch()
  const Posts = useSelector(selectPosts)
  const selectSubreddit = useSelector(selectSelectedSubreddit)

  useEffect(() => {
    dispatch(getPosts(selectSubreddit))
  }, [dispatch, selectSubreddit])

  return (
    <div className="posts-container">
      {Posts.map((Post) => {
        return (
          <div className="single-post-container">
            <div className="posts-vote-container">
              <button>1</button>
              <p>{Post.data.score}</p>
              <button>2</button>
            </div>
            <div className="posts-content-container">
              <p>
                r/{Post.data.subreddit} Posted by {Post.data.author}{' '}
                {formatTimeAgo(Post.data.created)}
              </p>
              <h1>{Post.data.title}</h1>
              <div className="posts-image-container">
                <img src={Post.data.url} alt="Post Image" />
              </div>
              <button className="posts-content-comments">
                {Post.data.num_comments} Comments
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
