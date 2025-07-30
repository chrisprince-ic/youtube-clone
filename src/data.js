export const API_KEY = 'AIzaSyA_IUccztILNFlhi5wGYsKZxjgKqoMFlq4';

// Use the new helper function for better formatting
export const value_converter = (value) => {
  if (!value) return '0';
  
  const num = parseInt(value);
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Video categories mapping
export const VIDEO_CATEGORIES = {
  0: 'All',
  1: 'Film & Animation',
  2: 'Autos & Vehicles',
  10: 'Music',
  15: 'Pets & Animals',
  17: 'Sports',
  19: 'Travel & Events',
  20: 'Gaming',
  22: 'People & Blogs',
  23: 'Comedy',
  24: 'Entertainment',
  25: 'News & Politics',
  26: 'Howto & Style',
  27: 'Education',
  28: 'Science & Technology',
  29: 'Nonprofits & Activism'
};

// Default video settings
export const DEFAULT_VIDEO_SETTINGS = {
  autoplay: 1,
  mute: 1,
  rel: 0,
  modestbranding: 1,
  controls: 1
};

// API endpoints
export const API_ENDPOINTS = {
  VIDEOS: 'https://youtube.googleapis.com/youtube/v3/videos',
  CHANNELS: 'https://youtube.googleapis.com/youtube/v3/channels',
  SEARCH: 'https://youtube.googleapis.com/youtube/v3/search'
};