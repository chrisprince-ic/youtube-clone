# YouTube Clone - Modern Video Platform

A beautiful, responsive YouTube clone built with React, featuring dark mode, smooth animations, and modern design principles.

## ✨ Features

### 🎨 Modern Design
- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)
- **Smooth Animations**: Framer Motion powered animations and transitions
- **Modern UI**: Clean, intuitive interface inspired by YouTube but with enhanced aesthetics

### 🚀 Performance
- **Fast Loading**: Optimized bundle size and lazy loading
- **Smooth Scrolling**: Custom scrollbars and smooth transitions
- **Loading States**: Beautiful skeleton loading animations
- **Error Handling**: Graceful error states with retry functionality

### 📱 Responsive Features
- **Mobile-First**: Designed for mobile devices with touch-friendly interactions
- **Adaptive Layout**: Sidebar collapses on mobile, responsive video grid
- **Touch Optimized**: Hover effects disabled on touch devices
- **Accessibility**: Full keyboard navigation and screen reader support

### 🎯 Core Functionality
- **Video Browsing**: Browse videos by category with infinite scroll
- **Video Player**: Full-featured video player with YouTube integration
- **Search**: Real-time search functionality (ready for implementation)
- **Categories**: Filter videos by different categories
- **Channel Info**: View channel details and subscribe functionality

## 🛠️ Tech Stack

- **React 19**: Latest React with hooks and modern patterns
- **Vite**: Fast build tool and development server
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful, customizable icons
- **CSS Variables**: Dynamic theming system
- **YouTube API**: Real video data integration

## 🎨 Design System

### Color Palette
- **Light Theme**: Clean whites and grays with red accent
- **Dark Theme**: Deep blacks and grays with enhanced contrast
- **CSS Variables**: Easy theme customization

### Typography
- **Roboto Font**: Google Fonts integration
- **Responsive Sizing**: Scales appropriately across devices
- **Hierarchy**: Clear visual hierarchy with proper font weights

### Components
- **Navbar**: Sticky navigation with search and theme toggle
- **Sidebar**: Collapsible sidebar with smooth animations
- **Video Cards**: Hover effects and loading states
- **Video Player**: Full-featured player with controls

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd youtube-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📁 Project Structure

```
src/
├── Components/
│   ├── Navbar/          # Navigation component
│   ├── Sidebar/         # Sidebar with categories
│   ├── Feed/           # Video grid component
│   └── PlayVideo/      # Video player component
├── Pages/
│   ├── Home/           # Home page
│   └── Video/          # Video page
├── contexts/
│   └── ThemeContext.jsx # Dark/light mode context
├── utils/
│   └── helpers.js      # Utility functions
├── data.js             # API configuration
└── index.css           # Global styles and CSS variables
```

## 🎯 Key Features Explained

### Dark Mode Implementation
- **Context API**: Centralized theme state management
- **CSS Variables**: Dynamic color switching
- **Local Storage**: Theme preference persistence
- **System Detection**: Automatic theme detection

### Responsive Design
- **Mobile-First**: Designed for mobile devices first
- **Breakpoints**: 480px, 768px, 1024px, 1200px
- **Flexible Grid**: CSS Grid with auto-fit columns
- **Touch Optimized**: Proper touch interactions

### Performance Optimizations
- **Lazy Loading**: Images and components load on demand
- **Debounced Search**: Optimized search input
- **Skeleton Loading**: Better perceived performance
- **Error Boundaries**: Graceful error handling

## 🎨 Customization

### Adding New Categories
Edit the `VIDEO_CATEGORIES` object in `src/data.js`:

```javascript
export const VIDEO_CATEGORIES = {
  0: 'All',
  20: 'Gaming',
  // Add your categories here
};
```

### Customizing Colors
Modify CSS variables in `src/index.css`:

```css
:root {
  --accent-color: #ff0000;
  --bg-primary: #ffffff;
  /* Add your custom colors */
}
```

### Adding Animations
Use Framer Motion in your components:

```javascript
import { motion } from 'framer-motion';

const MyComponent = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    Content
  </motion.div>
);
```

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- **ESLint**: Configured for React best practices
- **Prettier**: Consistent code formatting
- **TypeScript Ready**: Easy to add TypeScript

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository
2. Vercel will auto-detect the Vite configuration
3. Deploy with one click

### Netlify
1. Build the project: `npm run build`
2. Upload the `dist` folder to Netlify
3. Configure build settings if needed

### Other Platforms
The app is compatible with any static hosting platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- YouTube for inspiration
- Framer Motion for animations
- Lucide for beautiful icons
- Vite for fast development

---

**Note**: This is a demo project. The YouTube API key is for demonstration purposes only. For production use, please obtain your own API key from the Google Cloud Console.
