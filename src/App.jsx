import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './Components/Navbar/Navbar'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'

const App = () => {
  const [sidebar, setSidebar] = useState(true);
  
  return (
    <ThemeProvider>
      <div className="app">
        <Navbar setSidebar={setSidebar} />
        <Routes>
          <Route path='/' element={<Home sidebar={sidebar} />} />
          <Route path='/video/:categoryId/:videoId' element={<Video />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App