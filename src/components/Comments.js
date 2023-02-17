import React from 'react'
import { formatTimeAgo } from '../utils/formatTimeAgo'

export const Comments = ({ postComments }) => {
  return (
    <div>
      {postComments.length
        ? postComments[1].data.children.map((comment) => {
            if (comment.kind === 'more') {
              return
            }

            return (
              <div key={comment.data.id} className="comment-container">
                <p className="posts-cat-auth-time">
                  /r{comment.data.subreddit} <>&bull;</> Posted by <>&bull; </>
                  <span id="author-span">{comment.data.author}</span>{' '}
                  {formatTimeAgo(comment.data.created)}
                </p>

                <p className="comment-Body">{comment.data.body}</p>
              </div>
            )
          })
        : ''}
    </div>
  )
}
