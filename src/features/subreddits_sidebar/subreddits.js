import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchSubreddits, selectSubreddits } from './SubredditsSlice'
import { setSelectedSubreddit } from '../posts/PostsSlice'
import logo from '../../data/logo/reddit-logo-green.png'

export const Subreddits = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const Subreddits = useSelector(selectSubreddits)

  useEffect(() => {
    dispatch(fetchSubreddits())
  }, [dispatch])

  return (
    <div className="subreddit-container">
      <h2 className="subreddit-header">Subreddits</h2>
      <ul className="subreddit-list">
        {Subreddits.map((Subreddit) => {
          return (
            <li key={Subreddit.data.id} className="subreddit-category">
              <button
                onClick={() => {
                  const checkActive =
                    document.activeElement.parentElement.parentElement.querySelector(
                      '.active'
                    )

                  navigate('/')

                  if (checkActive) {
                    checkActive.className = ''
                  }

                  document.activeElement.className = 'active'

                  dispatch(
                    setSelectedSubreddit(Subreddit.data.display_name_prefixed)
                  )
                }}
              >
                <img
                  className="subreddit-icon-img"
                  src={Subreddit.data.icon_img ? Subreddit.data.icon_img : logo}
                  alt={Subreddit.data.display_name_prefixed}
                />
                <p className="subreddit-title">
                  {Subreddit.data.display_name_prefixed}
                </p>
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
