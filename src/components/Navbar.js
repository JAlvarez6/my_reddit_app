import React from 'react'
import { SearchBar } from '../features/searchTerm/SearchTerm'
import { faArrowLeft, faBars } from '@fortawesome/free-solid-svg-icons'
import logo from '../data/logo/reddit-logo-green.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Subreddits } from '../features/subreddits_sidebar/Subreddits'

export const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <img className="logo-img" src={logo} alt="logo" />
        <p className="logo-text">
          Reddit<span className="logo-span">Mini</span>
        </p>
      </div>

      <SearchBar />

      <button
        className="nav-category-menu"
        onClick={() => {
          const menu = document.querySelector('.nav-category-menu-open')
          const menuSubreddits = menu.querySelector('.subreddit-container')

          menu.style.display = 'block'
          menuSubreddits.style.display = 'block'
        }}
      >
        <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
      </button>

      <div className="nav-category-menu-open">
        <button
          className="nav-close-menu"
          onClick={() => {
            document.querySelector('.nav-category-menu-open').style.display =
              'none'
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
        </button>
        <Subreddits />
      </div>
    </nav>
  )
}
