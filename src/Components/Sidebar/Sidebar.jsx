import React from 'react'
import './Sidebar.css'
import { 
  Home, 
  Gamepad2, 
  Car, 
  Trophy, 
  Music, 
  Film, 
  Monitor, 
  Mic2, 
  Newspaper,
  Settings
} from 'lucide-react'

const Sidebar = ({ sidebar, category, setCategory }) => {
  const categories = [
    { id: 0, name: 'Home', icon: Home },
    { id: 20, name: 'Gaming', icon: Gamepad2 },
    { id: 2, name: 'Automobiles', icon: Car },
    { id: 17, name: 'Sports', icon: Trophy },
    { id: 24, name: 'Entertainment', icon: Film },
    { id: 28, name: 'Technology', icon: Monitor },
    { id: 10, name: 'Music', icon: Music },
    { id: 22, name: 'Blogs', icon: Mic2 },
    { id: 25, name: 'News', icon: Newspaper },
  ];

  return (
    <div className={`sidebar ${sidebar ? 'expanded' : 'collapsed'}`}>
      <div className="sidebar-content">
        <div className="sidebar-section">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                className={`sidebar-item ${category === cat.id ? 'active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                <Icon size={20} />
                {sidebar && <span className="item-text">{cat.name}</span>}
              </button>
            );
          })}
        </div>

        <div className="sidebar-divider" />

        <div className="sidebar-section">
          <button className="sidebar-item">
            <Settings size={20} />
            {sidebar && <span className="item-text">Settings</span>}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar