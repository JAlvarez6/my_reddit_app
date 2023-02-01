import React from 'react'
import { Link } from 'react-router-dom'
import { SearchBar } from '../features/searchbar/SearchBar.js'
import logo from '../data/logo/reddit-logo-green.png'

export const Navbar = () => {
  return (
    <nav>
      <div className="logo">
        <Link className="logo-link" to={'/'}>
          <img className="logo-img" src={logo} alt="logo" />
          <p className="logo-text">
            Reddit<span className="logo-span">Mini</span>
          </p>
        </Link>
      </div>
      <SearchBar />
    </nav>
  )
}
