import React from 'react'
import { SearchBar } from '../../features/SearchBar'
import logo from './logo/reddit-logo-green.png'

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
    </nav>
  )
}