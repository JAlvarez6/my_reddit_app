import React, { useEffect, useRef } from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export const Post = () => {
  const { postID } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Post = useSelector(selectPost)
  const postComments = useSelector(selectComments)
  const subredditSelected = useSelector(selectSelectedSubreddit)
  const loading = useSelector(selectLoadingPost)
  const commentsRef = useRef(null)

  useEffect(() => {
    dispatch(fetchPost(postID))
    dispatch(fetchComments(postID, subredditSelected))

    window.addEventListener('scroll', handleScrollToTop)

    return () => window.removeEventListener('scroll', handleScrollToTop)
  }, [dispatch, postID, subredditSelected])

  return (
    <div className="outer-post-container">
      <button className="post-goBack-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>
      <div className="inner-post-container">
        {/* Refactor line bellow later */}
        {Post.length ? <SinglePost Post={Post[0]} /> : <p>Loading Post...</p>}
      </div>

      <div id="comments" className="comments-container" ref={commentsRef}>
        <Comments postComments={postComments} />
      </div>

      <button className="backToTop-button" onClick={backToTop}>
        Back to Top
      </button>
    </div>
  )
}
