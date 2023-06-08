import React, { useRef, useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { media } from '../gql/Query';
import { BsPlayFill, BsPauseFill } from 'react-icons/bs';

export const MusicPlayer = () => {
    const { data } = useQuery(media);
    const audioTitle = data?.audioTracks[0].audioTitle;
    const audioSource = data?.audioTracks[0].audioUrl.url;

    const audioRef = useRef<HTMLAudioElement | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isSeeking, setIsSeeking] = useState(false);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.addEventListener('ended', handleEnded);
        }
        return () => {
            if (audioRef.current) {
                audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
                audioRef.current.removeEventListener('ended', handleEnded);
            }
        };
    }, []);

    const handleLoadedMetadata = () => {
        setDuration(audioRef.current ? audioRef.current.duration : 0);
    };

    const handleTimeUpdate = () => {
        setCurrentTime(audioRef.current ? audioRef.current.currentTime : 0);
    };

    const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    const togglePlayback = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleSeek = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (audioRef.current && !isSeeking) {
            const seekPosition = e.nativeEvent.offsetX;
            const barWidth = e.currentTarget.clientWidth;
            const seekTime = (seekPosition / barWidth) * duration;
            audioRef.current.currentTime = seekTime;
            setCurrentTime(seekTime);
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    return (
        <div className="music-player-container">
            <div className="audio-title">
                <h1>{audioTitle}</h1>
            </div>
            <div className="audio-player">
                <audio ref={audioRef} src={audioSource} autoPlay={false}/>
            </div>
                <button className="play-pause-button" onClick={togglePlayback}>
                    {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
                </button>
                <div className="progress-bar" onClick={handleSeek}>
                    <div className="progress-bar-fill" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                </div>
                <div className="time-duration">{formatTime(currentTime)}</div>
        </div>
    );
};
