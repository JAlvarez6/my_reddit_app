import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPost, selectLoadingPost, selectPost } from './PostSlice'
import { SinglePost } from '../../components/SinglePost'
import { Comments } from '../comments/Comments'

export const Post = () => {
  const { postID } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Post = useSelector(selectPost)
  const loading = useSelector(selectLoadingPost)

  useEffect(() => {
    dispatch(fetchPost(postID))
  }, [dispatch, postID])

  return (
    <div className="outer-post-container">
      <button className="post-goBack-button" onClick={() => navigate(-1)}>
        go back
      </button>
      <div className="inner-post-container">
        {/* Refactor line bellow later */}
        {Post.length ? <SinglePost Post={Post[0]} /> : <p>Loading Post...</p>}

        {/* <div className="post-likes-container">
          <button>1</button>
          <p>Likes</p>
          <button>2</button>
        </div>

        <div className="post-content-container">
          <p>Username and time posted</p>
          <h1>Post Title</h1>
          <img src="http://via.placeholder.com/450x300" alt="" />
          <button>Comments</button>
        </div> */}
      </div>

      <div className="comment-container">
        <p>Comments Section</p>
        <Comments />
      </div>
    </div>
  )
}
