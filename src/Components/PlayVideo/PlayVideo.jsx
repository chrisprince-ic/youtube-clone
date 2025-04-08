import React, { useState, useEffect } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import jack from '../../assets/jack.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';

const PlayVideo = ({ videoId }) => {
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData]= useState(null);



  // Fetching video data
  const fetchVideoData = async () => {
    try {
      const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
      const response = await fetch(videoDetails_url);
      const data = await response.json();
      
      if (data.items && data.items.length > 0) {
        setApiData(data.items[0]);
      } else {
        console.error("Video data not found");
      }
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  //Fetching channel data

  const fetchOtherData = async ()=>{
    const channelData_url =`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelData_url).then(res=>res.json()).then(data=>setChannelData(data.items[0]))

    //fetching comment data
    //
  }

  useEffect(() => {
    if (videoId) {
      fetchVideoData();
    }
  },); // Depend on videoId so it updates when the video changes
  
  useEffect(() => {
    if (videoId) {
      fetchOtherData();
    }
  },[apiData]); // Depend on videoId so it updates when the video changes

  


  return (
    <div className="play-video">
      {/* Embedded YouTube Video */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>

      {/* Video Title */}
      <h3>{apiData?.snippet?.title || "Title Not Available"}</h3>

      {/* Video Info */}
      <div className="play-video-info">
        <p>
          {value_converter(apiData?.statistics?.viewCount || "0")} Views &bull;{" "}
          {apiData?.snippet?.publishedAt ? moment(apiData.snippet.publishedAt).fromNow() : "Unknown Date"}
        </p>
        <div>
          <span>
            <img src={like} alt="Like" />
            {apiData?.statistics?.likeCount ? value_converter(apiData.statistics.likeCount) : 144}
          </span>
          <span>
            <img src={share} alt="Share" /> Share
          </span>
          <span>
            <img src={save} alt="Save" /> Save
          </span>
        </div>
      </div>

      <hr />

      {/* Publisher Info */}
      <div className="publisher">
        <img src={channelData?channelData.snippet.thumbnails.default.url:""} alt="Publisher" />
        <div>
          <p>{apiData?apiData.snippet.channelTitle:"Chrisss"}</p>
          <span>{channelData? value_converter(channelData.statistics.subscriberCount):""}Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>

      {/* Video Description */}
      <div className="vid-description">
        <p>{apiData?.snippet?.description.slice(0, 250) || "No description available."}</p>
        <hr />

        {/* Comments Section */}
        <h4>{apiData?value_converter(apiData.statistics.commentCount):102}comments</h4>
        <div className="comment">
          <img src={user_profile} alt="User Profile" />
          <div>
            <h3>Jack Nick <span>1 day ago</span></h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit iure eveniet asperiores mollitia libero voluptate facere suscipit, autem eligendi recusandae veniam adipisci optio debitis dolores architecto itaque explicabo nobis beatae.
            </p>
            <div className="comment-action">
              <img src={like} alt="Like" />
              <span>244</span>
              <img src={dislike} alt="Dislike" />
              <span>2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;
