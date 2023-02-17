import React from 'react'
import { formatTimeAgo } from '../utils/formatTimeAgo'
import {
  galleryImages,
  galleryRight,
  galleryLeft,
} from '../utils/galleryHandler'
import { useParams } from 'react-router-dom'
import { marked } from 'marked'
import { faComment } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { TbArrowBigTop, TbArrowBigDown } from 'react-icons/tb'
import { TbArrowBigLeft } from 'react-icons/tb'
import { TbArrowBigRight } from 'react-icons/tb'

export const SinglePost = ({ Post }) => {
  const { postID } = useParams()

  return (
    <>
      <div className="posts-vote-container">
        <button
          className="vote-Up"
          onClick={(e) => {
            e.stopPropagation()

            const upActive = document.activeElement

            const downActive =
              document.activeElement.parentElement.querySelector('.vote-Down')

            if (upActive.className.includes('vote-Up-Active')) {
              upActive.className = 'vote-Up'
            } else {
              upActive.className += ' vote-Up-Active'
              downActive.className = 'vote-Down'
            }
          }}
        >
          {<TbArrowBigTop />}
        </button>
        <p id="vote-amount">{Post.data.score}</p>
        <button
          className="vote-Down"
          onClick={(e) => {
            e.stopPropagation()

            const downActive = document.activeElement

            const upActive =
              document.activeElement.parentElement.querySelector('.vote-Up')

            if (downActive.className.includes('vote-Down-Active')) {
              downActive.className = 'vote-Down'
            } else {
              downActive.className += ' vote-Down-Active'
              upActive.className = 'vote-Up'
            }
          }}
        >
          {<TbArrowBigDown />}
        </button>
      </div>

      <div className="posts-content-container">
        <p className="posts-cat-auth-time">
          r/{Post.data.subreddit} <>&bull;</> Posted by{' '}
          <span id="author-span">{Post.data.author}</span>
          <> &bull; </>
          {formatTimeAgo(Post.data.created)}
        </p>
        <h2>{Post.data.title}</h2>

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
              <p>This video can not be played at the moment.</p>
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
                <TbArrowBigLeft />
              </button>
              <button className="gallery-button-next" onClick={galleryRight}>
                <TbArrowBigRight />
              </button>
            </div>
          </div>
        ) : (
          ''
        )}

        <button
          className="posts-content-comments"
          onClick={() => {
            if (postID) {
              const commentSection = document.getElementById('comments')
              commentSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              })
            }
          }}
        >
          <FontAwesomeIcon icon={faComment}></FontAwesomeIcon>{' '}
          {Post.data.num_comments} Comments
        </button>
      </div>
    </>
  )
}
