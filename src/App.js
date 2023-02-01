import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Post } from './features/post/Post'
import { Posts } from './features/posts/Posts'
import { Subreddits } from './features/subreddits_sidebar/Subreddits'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/post/:id" element={<Post />} />
          </Routes>
          <Subreddits />
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App
