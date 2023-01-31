import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

export const SearchBar = () => {
  return (
    <form className="form-searchbar" action="">
      <div className="form-group">
        <input
          className="form-searchbar-input"
          type="text"
          name=""
          id=""
          placeholder="Search..."
        />
        <FontAwesomeIcon
          className="form-searchbar-icon"
          icon={faMagnifyingGlass}
        />
      </div>
    </form>
  )
}
