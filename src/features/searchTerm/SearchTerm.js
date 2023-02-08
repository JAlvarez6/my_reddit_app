import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { searchTerm, selectSelectedSubreddit } from '../posts/PostsSlice'

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const subreddit = useSelector(selectSelectedSubreddit)

  const handleInput = (e) => {
    setSearchInput(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(searchTerm(searchInput))
    navigate('/')
  }

  useEffect(() => {
    setSearchInput('')
  }, [subreddit])

  return (
    <form className="form-searchbar" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          className="form-searchbar-input"
          type="text"
          name=""
          id=""
          value={searchInput}
          placeholder="Search..."
          onChange={handleInput}
        />
        <FontAwesomeIcon
          className="form-searchbar-icon"
          icon={faMagnifyingGlass}
        />
      </div>
    </form>
  )
}
