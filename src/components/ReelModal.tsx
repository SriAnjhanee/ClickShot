import React, { useEffect, useRef, useState } from 'react';
import type { ReelItem } from '../data/portfolio';
import { 
  X, 
  Play, 
  Volume2, 
  VolumeX, 
  Clock, 
  Eye, 
  Music, 
  ArrowUpRight, 
  Share2,
  Check
} from 'lucide-react';

interface ReelModalProps {
  reel: ReelItem | null;
  onClose: () => void;
  onBookShoot: (shootTitle: string) => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({ reel, onClose, onBookShoot }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, isMuted]);

  if (!reel) return null;

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      setDuration(videoRef.current.duration || 0);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Background Click to Dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Lightbox Container */}
      <div className="relative z-10 w-full max-w-4xl bg-surface-950 text-white rounded-3xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        
        {/* Left Side: 9:16 Vertical Video Player */}
        <div className="relative md:w-[380px] lg:w-[420px] bg-black flex items-center justify-center flex-shrink-0">
          
          <video
            ref={videoRef}
            src={reel.videoUrl}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onClick={togglePlay}
            className="w-full h-full max-h-[70vh] md:max-h-[85vh] object-cover cursor-pointer"
          />

          {/* Top Player Overlay */}
          <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-extrabold uppercase tracking-wide">
              {reel.categoryLabel}
            </span>

            <div className="pointer-events-auto flex items-center gap-2">
              <button
                onClick={toggleMute}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-brand-600 transition-colors"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Center Play/Pause Trigger */}
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center pointer-events-auto"
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {!isPlaying && (
              <div className="w-16 h-16 rounded-full bg-brand-600/90 text-white flex items-center justify-center shadow-glow-lg backdrop-blur-sm">
                <Play className="w-8 h-8 ml-1" fill="currentColor" />
              </div>
            )}
          </button>

          {/* Bottom Player Scrub Bar */}
          <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black via-black/60 to-transparent">
            <div className="relative w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-2">
              <div
                className="h-full bg-brand-500 rounded-full transition-all duration-100"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-zinc-400">
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-brand-400 font-bold"
                >
                  {isPlaying ? 'PAUSE' : 'PLAY'}
                </button>
                <span>•</span>
                <span>{Math.floor(currentTime)}s / {Math.floor(duration || 0)}s</span>
              </div>
              <span className="text-emerald-400 font-semibold">{reel.turnaroundTime}</span>
            </div>
          </div>

        </div>

        {/* Right Side: Reel Metadata, Shoot Context & Booking Action */}
        <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between overflow-y-auto bg-surface-950 border-t md:border-t-0 md:border-l border-zinc-800">
          
          <div>
            {/* Top Close & Share Actions */}
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-extrabold uppercase tracking-wider text-zinc-400">
                  Verified ClickShot Delivery
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyLink}
                  className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors"
                  title="Copy Link"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-zinc-800 hover:bg-brand-600 text-white transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Reel Title & Description */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mb-3">
              {reel.title}
            </h2>

            <p className="text-sm text-zinc-300 leading-relaxed mb-6">
              {reel.eventDescription}
            </p>

            {/* Shoot Specs Breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-6 p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800">
              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Delivery Time</span>
                <span className="text-sm font-extrabold text-emerald-400 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5" />
                  {reel.turnaroundTime}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Client / Event</span>
                <span className="text-sm font-bold text-white mt-0.5">{reel.client}</span>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Reach / Views</span>
                <span className="text-sm font-bold text-zinc-200 flex items-center gap-1 mt-0.5">
                  <Eye className="w-3.5 h-3.5 text-zinc-400" />
                  {reel.viewsCount}
                </span>
              </div>

              <div className="flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">Format</span>
                <span className="text-sm font-bold text-zinc-200 mt-0.5">9:16 Cinema 4K</span>
              </div>
            </div>

            {/* Audio Track Highlight */}
            <div className="p-3.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-brand-950 text-brand-400 flex items-center justify-center flex-shrink-0 border border-brand-800">
                <Music className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] uppercase font-bold text-zinc-500 block">Soundtrack</span>
                <span className="text-xs font-semibold text-zinc-200 truncate block">{reel.musicTrack}</span>
              </div>
            </div>
          </div>

          {/* Bottom Direct CTA */}
          <div className="pt-4 border-t border-zinc-800 flex flex-col gap-2.5">
            <button
              onClick={() => {
                onClose();
                onBookShoot(reel.categoryLabel);
              }}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-600/25 hover:bg-brand-700 hover:shadow-glow transition-all duration-300 cursor-pointer"
            >
              <span>Book a Similar Reel Shoot</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <span className="text-[11px] text-zinc-500 text-center">
              *Instant turnaround guaranteed when booked in advance.
            </span>
          </div>

        </div>

      </div>

    </div>
  );
};
