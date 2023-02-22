import React from 'react'
import { useNavigate } from 'react-router-dom'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const NotFound = () => {
  const navigate = useNavigate()

  return (
    <>
      <button className="post-goBack-button" onClick={() => navigate(-1)}>
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </button>

      <div className="notFoundContainer">
        <h2>Post Not Found</h2>
        <p>
          This post cannot be retrieved at this time or this post does not
          exist. Please Try Again later.
        </p>
      </div>
    </>
  )
}
