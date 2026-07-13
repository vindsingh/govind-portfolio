'use client'

import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

interface VideoPlayerProps {
  src: string
  aspectRatio?: string
  borderRadius?: string
  showMuteToggle?: boolean
}

export default function VideoPlayer({
  src,
  aspectRatio = '16/9',
  borderRadius = '8px',
  showMuteToggle = false,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.muted = true
    video.play().catch((err) => {
      console.warn('VideoPlayer failed:', src, err)
    })
  }, [src])

  const toggleMute = () => {
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setMuted(video.muted)
  }

  return (
    <div style={{
      position: 'relative',
      width: '100%',
      aspectRatio,
      borderRadius,
      overflow: 'hidden',
      background: '#000',
    }}>
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        playsInline
        preload="auto"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
      {showMuteToggle && (
        <button
          onClick={toggleMute}
          style={{
            position: 'absolute',
            bottom: '12px',
            right: '12px',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.5)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            zIndex: 10,
          }}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      )}
    </div>
  )
}
