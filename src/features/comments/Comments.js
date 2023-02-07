import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { formatTimeAgo } from '../../utils/formatTimeAgo'
import { selectSelectedSubreddit } from '../posts/PostsSlice'
import { fetchComments, selectComments } from './CommentsSlice'

export const Comments = () => {
  const dispatch = useDispatch()
  const postComments = useSelector(selectComments)
  const subredditSelected = useSelector(selectSelectedSubreddit)
  const { postID } = useParams()

  useEffect(() => {
    dispatch(fetchComments(postID, subredditSelected))
  }, [])

  return (
    <div>
      {postComments.length
        ? postComments[1].data.children.map((comment) => {
            if (comment.kind === 'more') {
              return
            }

            return (
              <div key={comment.data.id}>
                <p>
                  {'/r' +
                    comment.data.subreddit +
                    ' Posted by ' +
                    comment.data.author +
                    ' ' +
                    formatTimeAgo(comment.data.created)}
                </p>

                <p>{comment.data.body}</p>
              </div>
            )
          })
        : ''}
    </div>
  )
}
