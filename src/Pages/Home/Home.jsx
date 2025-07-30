import React, { useState } from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'

const Home = ({ sidebar }) => {
  const [category, setCategory] = useState(0);
  
  return (
    <div className="home-container">
      <Sidebar sidebar={sidebar} category={category} setCategory={setCategory} />
      
      <main className={`main-content ${sidebar ? 'sidebar-open' : 'sidebar-closed'}`}>
        <Feed category={category} />
      </main>
    </div>
  )
}

export default Home