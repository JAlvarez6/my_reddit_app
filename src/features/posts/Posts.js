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

  const galleryImages = (galleryData) => {
    const gallery = []

    for (const item in galleryData) {
      const itemData = galleryData[item]

      const url = itemData.s.u ?? itemData.s.gif

      gallery.push(url.split('amp;').join(''))
    }

    return gallery
  }

  const tempFunc1 = (e) => {
    const targetGallery = e.target.parentElement.id
    const oneGallery = document.querySelector('.gallery-container')
    const getGallerySlides = oneGallery.querySelectorAll('.gallery-slide')

    const tempVar1 = document.getElementById(targetGallery)
    const tempVar2 = tempVar1.querySelectorAll('.gallery-slide')

    console.log(tempVar1.querySelectorAll('.gallery-slide'))

    // Object.values(getGallerySlides).map((slide, index) => {
    //   if (slide.style.right === '') {
    //     slide.style.right = 0
    //   }

    //   if (
    //     (getGallerySlides.length - 1) * 100 ===
    //     parseFloat(slide.style.right)
    //   ) {
    //     return
    //   }

    //   let num1 = parseFloat(slide.style.right)
    //   num1 += 100

    //   console.log((slide.style.right = num1 + '%'))
    // })

    Object.values(tempVar2).map((slide, index) => {
      if (slide.style.right === '') {
        slide.style.right = 0
      }

      if ((tempVar2.length - 1) * 100 === parseFloat(slide.style.right)) {
        return
      }

      let num1 = parseFloat(slide.style.right)
      num1 += 100

      console.log((slide.style.right = num1 + '%'))
    })
  }

  const tempFunc2 = (e) => {
    const oneGallery = document.querySelector('.gallery-container')
    const getGallerySlides = oneGallery.querySelectorAll('.gallery-slide')
    const targetGallery = e.target.parentElement.id
    const tempVar1 = document.getElementById(targetGallery)
    const tempVar2 = tempVar1.querySelectorAll('.gallery-slide')

    // Object.values(getGallerySlides).map((slide, index) => {
    //   if (slide.style.right === '') {
    //     slide.style.right = 0
    //   }

    //   if (parseFloat(slide.style.right) === 0) {
    //     return
    //   }

    //   let num1 = parseFloat(slide.style.right)
    //   num1 -= 100

    //   console.log((slide.style.right = num1 + '%'))
    // })

    Object.values(tempVar2).map((slide, index) => {
      if (slide.style.right === '') {
        slide.style.right = 0
      }

      if (parseFloat(slide.style.right) === 0) {
        return
      }

      let num1 = parseFloat(slide.style.right)
      num1 -= 100

      console.log((slide.style.right = num1 + '%'))
    })
  }

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
                    {galleryImages(Post.data.media_metadata).map(
                      (image, index) => {
                        return (
                          <div
                            //id={`${Post.data.id + index}`}
                            className="gallery-slide"
                          >
                            <img
                              src={image}
                              alt={`Gallery image ${index + 1}`}
                            />
                          </div>
                        )
                      }
                    )}

                    <button className="gallery-button-prev" onClick={tempFunc2}>
                      1
                    </button>
                    <button className="gallery-button-next" onClick={tempFunc1}>
                      2
                    </button>
                  </div>

                  {/* <div>
                    {galleryImages(Post.data.media_metadata).map(
                      (image, index) => {
                        return (
                          <span
                            className="gallery-nav"
                            onClick={currentSlides(index + 1)}
                          >
                            •
                          </span>
                        )
                      }
                    )}
                  </div> */}
                </div>
              ) : (
                ''
              )}

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
