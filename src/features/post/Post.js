import React from 'react'

export const Post = () => {
  return (
    <div className="outer-post-container">
      <div className="inner-post-container">
        <div className="post-likes-container">
          <button>1</button>
          <p>Likes</p>
          <button>2</button>
        </div>

        <div className="post-content-container">
          <p>Username and time posted</p>
          <h1>Post Title</h1>
          <img src="http://via.placeholder.com/450x300" alt="" />
          <button>Comments</button>
        </div>
      </div>

      <div className="comment-container">Comments Section</div>
    </div>
  )
}
