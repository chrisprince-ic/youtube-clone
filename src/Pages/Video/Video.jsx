import React from 'react'
import './Video.css'
import PlayVideo from '../../Components/PlayVideo/PlayVideo'
import { useParams } from 'react-router-dom'

const Video = () => {
  const { videoId } = useParams();
  
  return (
    <div className="video-page">
      <div className="video-container">
        <PlayVideo videoId={videoId} />
      </div>
    </div>
  )
}

export default Video