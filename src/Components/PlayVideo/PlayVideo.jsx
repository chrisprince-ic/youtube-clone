import React, { useState, useEffect } from 'react';
import './PlayVideo.css';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { 
  ThumbsUp, 
  ThumbsDown, 
  Share2, 
  Download, 
  MoreHorizontal,
  User,
  Clock,
  Eye,
  Heart,
  MessageCircle
} from 'lucide-react';

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  // Fetching video data
  const fetchVideoData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoDetails_url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        setApiData(data.items[0]);
      } else {
        throw new Error("Video not found");
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
      setError('Failed to load video. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetching channel data
  const fetchChannelData = async () => {
    if (!apiData?.snippet?.channelId) return;
    
    try {
      const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      const response = await fetch(channelData_url);
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        setChannelData(data.items[0]);
      }
    } catch (error) {
      console.error("Error fetching channel data:", error);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchVideoData();
    }
  }, [videoId]);

  useEffect(() => {
    if (apiData) {
      fetchChannelData();
    }
  }, [apiData]);

  const handleLike = () => {
    setLiked(!liked);
    if (disliked) setDisliked(false);
  };

  const handleDislike = () => {
    setDisliked(!disliked);
    if (liked) setLiked(false);
  };

  const LoadingSkeleton = () => (
    <div className="play-video skeleton">
      <div className="video-player-skeleton"></div>
      <div className="video-info-skeleton">
        <div className="skeleton-title"></div>
        <div className="skeleton-stats"></div>
        <div className="skeleton-channel"></div>
      </div>
    </div>
  );

  const ErrorMessage = () => (
    <div className="error-container">
      <div className="error-content">
        <h3>Video Not Available</h3>
        <p>{error}</p>
        <button onClick={fetchVideoData} className="retry-button">
          Try Again
        </button>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <ErrorMessage />;
  }

  if (!apiData) {
    return <ErrorMessage />;
  }

  return (
    <div className="play-video">
      {/* Video Player */}
      <div className="video-player-container">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&rel=0`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="video-player"
          title={apiData.snippet?.title || "Video Player"}
        />
      </div>

      {/* Video Info */}
      <div className="video-info">
        <h1 className="video-title">{apiData.snippet?.title || "Title Not Available"}</h1>
        
        <div className="video-stats">
          <div className="stats-left">
            <div className="stat-item">
              <Eye size={16} />
              <span>{value_converter(apiData.statistics?.viewCount || "0")} views</span>
            </div>
            <div className="stat-item">
              <Clock size={16} />
              <span>{moment(apiData.snippet?.publishedAt).fromNow()}</span>
            </div>
          </div>
          
          <div className="stats-right">
            <button 
              className={`action-button ${liked ? 'active' : ''}`}
              onClick={handleLike}
            >
              <ThumbsUp size={18} />
              <span>{value_converter(apiData.statistics?.likeCount || "0")}</span>
            </button>
            
            <button 
              className={`action-button ${disliked ? 'active' : ''}`}
              onClick={handleDislike}
            >
              <ThumbsDown size={18} />
            </button>
            
            <button className="action-button">
              <Share2 size={18} />
              <span>Share</span>
            </button>
            
            <button className="action-button">
              <Download size={18} />
              <span>Download</span>
            </button>
            
            <button className="action-button">
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Channel Info */}
      <div className="channel-section">
        <div className="channel-info">
          <div className="channel-avatar">
            <img 
              src={channelData?.snippet?.thumbnails?.default?.url || ''} 
              alt={apiData.snippet?.channelTitle || "Channel"}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div className="avatar-fallback">
              <User size={20} />
            </div>
          </div>
          
          <div className="channel-details">
            <h3 className="channel-name">{apiData.snippet?.channelTitle || "Unknown Channel"}</h3>
            <p className="subscriber-count">
              {channelData?.statistics?.subscriberCount ? 
                `${value_converter(channelData.statistics.subscriberCount)} subscribers` : 
                "Subscriber count unavailable"
              }
            </p>
          </div>
          
          <button className="subscribe-button">
            Subscribe
          </button>
        </div>
      </div>

      {/* Video Description */}
      <div className="video-description">
        <div className="description-header">
          <h3>Description</h3>
        </div>
        <div className="description-content">
          <p>{apiData.snippet?.description || "No description available."}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="comments-section">
        <div className="comments-header">
          <h3>Comments</h3>
          <span className="comment-count">0 comments</span>
        </div>
        <div className="comment-input">
          <div className="comment-avatar">
            <User size={20} />
          </div>
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="comment-text-input"
          />
        </div>
        <div className="comments-list">
          <p className="no-comments">No comments yet. Be the first to comment!</p>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
