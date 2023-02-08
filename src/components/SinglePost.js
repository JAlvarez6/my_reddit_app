import React from 'react'
import { formatTimeAgo } from '../utils/formatTimeAgo'
import {
  galleryImages,
  galleryRight,
  galleryLeft,
} from '../utils/galleryHandler'
import { useParams } from 'react-router-dom'
import { marked } from 'marked'

export const SinglePost = ({ Post }) => {
  const { postID } = useParams()

  return (
    <>
      <div className="posts-vote-container">
        <button
          onClick={(e) => {
            e.stopPropagation()

            console.log(Post.data.score + 1)
          }}
        >
          1
        </button>
        <p id="vote-amount">{Post.data.score}</p>
        <button
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          2
        </button>
      </div>

      <div className="posts-content-container">
        <p>
          r/{Post.data.subreddit} Posted by {Post.data.author}{' '}
          {formatTimeAgo(Post.data.created)}
        </p>
        <h1>{Post.data.title}</h1>

        {/* Checks for required ID in url and if post data has selftext then displays it */}
        {postID && Post.data.selftext ? (
          <div
            dangerouslySetInnerHTML={{
              __html: marked.parse(Post.data.selftext),
            }}
          ></div>
        ) : (
          ''
        )}

        {/* Checks if post data is a video, gif, img or a gallery */}

        {Post.data.post_hint?.match('hosted:video') ? (
          <div className="posts-media-container">
            <video controls autoPlay muted>
              <source
                src={Post.data.media.reddit_video?.fallback_url}
                type="video/mp4"
              />
              <source
                src={Post.data.media.reddit_video?.fallback_url}
                type="video/webm"
              />
            </video>
          </div>
        ) : Post.data.post_hint?.match('rich:video') ? (
          <div className="posts-media-container">
            <video controls autoPlay muted>
              <source
                src={Post.data.preview.reddit_video_preview?.fallback_url}
                type="video/mp4"
              />
              <source
                src={Post.data.preview.reddit_video_preview?.fallback_url}
                type="video/webm"
              />
            </video>
          </div>
        ) : Post.data.post_hint?.match('image') ? (
          <div className="posts-media-container">
            <img src={Post.data.url} alt="Post Image" />
          </div>
        ) : Post.data?.is_gallery ? (
          <div className="posts-media-container">
            <div id={Post.data.id} className="gallery-container">
              {galleryImages(Post.data.media_metadata).map((image, index) => {
                return (
                  <div className="gallery-slide">
                    <img src={image} alt={`Gallery image ${index + 1}`} />
                  </div>
                )
              })}

              <button className="gallery-button-prev" onClick={galleryLeft}>
                1
              </button>
              <button className="gallery-button-next" onClick={galleryRight}>
                2
              </button>
            </div>
          </div>
        ) : (
          ''
        )}

        <button className="posts-content-comments">
          {Post.data.num_comments} Comments
        </button>
      </div>
    </>
  )
}
