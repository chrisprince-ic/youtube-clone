import React, { useState, useEffect } from 'react';
import './Feed.css';
import { Link } from 'react-router-dom';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { Play, Eye, Clock, User, Image } from 'lucide-react';

const Feed = ({ category }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
            
            const response = await fetch(videoList_url);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const result = await response.json();
            setData(result.items || []);
        } catch (error) {
            console.error("Error fetching videos:", error);
            setError('Failed to load videos. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    // Helper function to get the best available thumbnail
    const getThumbnailUrl = (thumbnails) => {
        if (!thumbnails) return null;
        
        // Try different thumbnail sizes in order of preference
        const sizes = ['medium', 'high', 'standard', 'default'];
        
        for (const size of sizes) {
            if (thumbnails[size] && thumbnails[size].url) {
                return thumbnails[size].url;
            }
        }
        
        return null;
    };

    const LoadingSkeleton = () => (
        <div className="feed skeleton-grid">
            {[...Array(12)].map((_, index) => (
                <div key={index} className="video-card skeleton">
                    <div className="skeleton-thumbnail"></div>
                    <div className="skeleton-content">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-channel"></div>
                        <div className="skeleton-stats"></div>
                    </div>
                </div>
            ))}
        </div>
    );

    const ErrorMessage = () => (
        <div className="error-container">
            <div className="error-content">
                <h3>Oops! Something went wrong</h3>
                <p>{error}</p>
                <button onClick={fetchData} className="retry-button">
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

    return (
        <div className="feed">
            {data.map((item) => {
                const thumbnailUrl = getThumbnailUrl(item.snippet?.thumbnails);
                
                return (
                    <div
                        key={item.id}
                        className="video-card-wrapper"
                    >
                        <Link 
                            to={`/video/${item.snippet?.categoryId || '0'}/${item.id}`} 
                            className="video-card"
                        >
                            <div className="thumbnail-container">
                                {thumbnailUrl ? (
                                    <img 
                                        src={thumbnailUrl} 
                                        alt={item.snippet?.title || 'Video thumbnail'}
                                        className="thumbnail"
                                        loading="lazy"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                ) : null}
                                <div className="thumbnail-fallback">
                                    <Image size={40} />
                                    <span>No thumbnail available</span>
                                </div>
                                <div className="thumbnail-overlay">
                                    <Play size={20} />
                                </div>
                                <div className="video-duration">
                                    {item.contentDetails?.duration ? 
                                        moment.duration(item.contentDetails.duration).asMinutes().toFixed(0) + 'm' : 
                                        'N/A'
                                    }
                                </div>
                            </div>
                            
                            <div className="video-info">
                                <h3 className="video-title" title={item.snippet?.title || 'Untitled'}>
                                    {item.snippet?.title || 'Untitled Video'}
                                </h3>
                                
                                <div className="channel-info">
                                    <User size={14} />
                                    <span className="channel-name">
                                        {item.snippet?.channelTitle || 'Unknown Channel'}
                                    </span>
                                </div>
                                
                                <div className="video-stats">
                                    <div className="stat-item">
                                        <Eye size={14} />
                                        <span>{value_converter(item.statistics?.viewCount || "0")} views</span>
                                    </div>
                                    <div className="stat-item">
                                        <Clock size={14} />
                                        <span>{moment(item.snippet?.publishedAt).fromNow()}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                );
            })}
        </div>
    );
};

export default Feed;
