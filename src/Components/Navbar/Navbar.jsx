import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import { 
  Menu, 
  Search, 
  Mic, 
  Video, 
  Bell, 
  User,
  Moon,
  Sun,
  Settings
} from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const Navbar = ({ setSidebar }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    // TODO: Implement search functionality
    console.log('Searching for:', searchQuery);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <button 
            className="menu-button"
            onClick={() => setSidebar(prev => !prev)}
            aria-label="Toggle sidebar"
          >
            <Menu size={24} />
          </button>
          
          <Link to="/" className="logo-link">
            <div className="logo">
              <span className="logo-text">YouTube</span>
              <span className="logo-clone">Clone</span>
            </div>
          </Link>
        </div>

        <div className="navbar-center">
          <form onSubmit={handleSearch} className="search-container">
            <div className={`search-box ${isSearchFocused ? 'focused' : ''}`}>
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                className="search-input"
              />
              <button type="submit" className="search-button" aria-label="Search">
                <Search size={20} />
              </button>
            </div>
            <button className="voice-button" aria-label="Voice search">
              <Mic size={20} />
            </button>
          </form>
        </div>

        <div className="navbar-right">
          <button className="icon-button" aria-label="Create">
            <Video size={20} />
          </button>
          
          <button className="icon-button" aria-label="Notifications">
            <Bell size={20} />
          </button>
          
          <button 
            className="icon-button theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDarkMode ? 'light' : 'dark'} mode`}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="icon-button" aria-label="Settings">
            <Settings size={20} />
          </button>
          
          <button className="user-button" aria-label="User profile">
            <User size={20} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar