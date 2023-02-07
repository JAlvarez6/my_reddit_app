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
