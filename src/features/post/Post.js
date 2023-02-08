import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchPost,
  fetchComments,
  selectLoadingPost,
  selectPost,
  selectComments,
} from './PostSlice'
import { selectSelectedSubreddit } from '../posts/PostsSlice'
import { SinglePost } from '../../components/SinglePost'
import { Comments } from '../../components/Comments'
import { backToTop, handleScrollToTop } from '../../utils/backToTop'

export const Post = () => {
  const { postID } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Post = useSelector(selectPost)
  const postComments = useSelector(selectComments)
  const subredditSelected = useSelector(selectSelectedSubreddit)
  const loading = useSelector(selectLoadingPost)

  useEffect(() => {
    dispatch(fetchPost(postID))
    dispatch(fetchComments(postID, subredditSelected))

    window.addEventListener('scroll', handleScrollToTop)

    return () => window.removeEventListener('scroll', handleScrollToTop)
  }, [dispatch, postID, subredditSelected])

  return (
    <div className="outer-post-container">
      <button className="post-goBack-button" onClick={() => navigate(-1)}>
        go back
      </button>
      <div className="inner-post-container">
        {/* Refactor line bellow later */}
        {Post.length ? <SinglePost Post={Post[0]} /> : <p>Loading Post...</p>}
      </div>

      <div className="comment-container">
        <p>Comments Section</p>
        <Comments postComments={postComments} />
      </div>

      <button className="backToTop-button" onClick={backToTop}>
        Back to Top
      </button>
    </div>
  )
}
