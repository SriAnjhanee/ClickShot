import React, { useState, useRef, useEffect } from 'react';
import { PORTFOLIO_REELS } from '../data/portfolio';
import type { ReelItem } from '../data/portfolio';
import { Play, Clock, Eye, Music, Maximize2 } from 'lucide-react';

interface PortfolioProps {
  onSelectReel: (reel: ReelItem) => void;
}

// Subcomponent for individual portfolio card with IntersectionObserver autoplay
const ReelCard: React.FC<{
  reel: ReelItem;
  onSelect: () => void;
  isLarge?: boolean;
}> = ({ reel, onSelect, isLarge = false }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting) {
            videoRef.current.play().catch(() => {
              // Ignore autoplay restriction errors
            });
          } else {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onSelect}
      className={`group relative rounded-3xl overflow-hidden cursor-pointer bg-zinc-900 border-2 border-zinc-200/80 shadow-md hover:shadow-card-hover hover:border-brand-500 transition-all duration-500 transform hover:-translate-y-1.5 ${
        isLarge ? 'md:row-span-2' : ''
      }`}
      style={{ minHeight: isLarge ? '560px' : '460px' }}
    >
      {/* 9:16 Vertical Video Element */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        poster={reel.posterUrl}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />

      {/* Dark Ambient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/40 group-hover:from-black/95 transition-all duration-300" />

      {/* Top Bar: Category & Turnaround Time */}
      <div className="absolute top-4 inset-x-4 flex items-center justify-between z-10">
        <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-surface-950 text-xs font-extrabold tracking-wide uppercase shadow-sm">
          {reel.categoryLabel}
        </span>
        <span className="px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1 shadow-sm">
          <Clock className="w-3 h-3" />
          {reel.turnaroundTime}
        </span>
      </div>

      {/* Center Watch Indicator on Hover */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
        <div
          className={`w-16 h-16 rounded-full bg-brand-600/90 backdrop-blur-md text-white flex items-center justify-center shadow-glow-lg transition-all duration-300 ${
            isHovered ? 'scale-100 opacity-100' : 'scale-75 opacity-0'
          }`}
        >
          <Play className="w-7 h-7 ml-1" fill="currentColor" />
        </div>
      </div>

      {/* Bottom Story & Metrics Footer */}
      <div className="absolute bottom-0 inset-x-0 p-5 sm:p-6 text-white z-10">
        <div className="flex items-center gap-3 text-xs text-zinc-300 mb-2">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-zinc-400" />
            {reel.viewsCount} views
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 truncate text-zinc-300">
            <Music className="w-3.5 h-3.5 text-brand-400" />
            {reel.musicTrack}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-white leading-snug mb-2 group-hover:text-brand-300 transition-colors">
          {reel.title}
        </h3>

        <div className="flex items-center justify-between pt-3 border-t border-white/15 text-xs">
          <span className="text-zinc-400 truncate max-w-[180px]">Client: {reel.client}</span>
          <span className="text-white font-bold flex items-center gap-1 group-hover:text-brand-400 transition-colors">
            Watch Reel
            <Maximize2 className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
};

export const Portfolio: React.FC<PortfolioProps> = ({ onSelectReel }) => {
  return (
    <section id="portfolio" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Masonry / Editorial Reel Wall */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PORTFOLIO_REELS.map((reel, idx) => (
            <ReelCard
              key={reel.id}
              reel={reel}
              onSelect={() => onSelectReel(reel)}
              isLarge={idx === 0 || idx === 3}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
