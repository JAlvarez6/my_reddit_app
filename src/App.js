import React from 'react'
import { Navbar } from './components/Navbar/Navbar'
import { Posts } from './features/posts/Posts'
import { Subreddits } from './features/subreddits_sidebar/subreddits'

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-container">
        <Posts />
        <Subreddits />
      </div>
    </div>
  )
}

export default App
