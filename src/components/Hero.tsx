import React, { useRef, useState } from 'react';
import { HERO_REELS } from '../data/portfolio';
import type { ReelItem } from '../data/portfolio';
import { SITE_CONTENT } from '../data/content';
import { 
  Play, 
  Volume2, 
  VolumeX, 
  ArrowUpRight, 
  Sparkles, 
  Clock, 
  Film, 
  Maximize2
} from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onSelectReel: (reel: ReelItem) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onSelectReel }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const centerVideoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (centerVideoRef.current) {
      if (isPlaying) {
        centerVideoRef.current.pause();
        setIsPlaying(false);
      } else {
        centerVideoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (centerVideoRef.current) {
      centerVideoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleHeroReelClick = (index: number) => {
    const reel = HERO_REELS[index];
    onSelectReel({
      id: reel.id,
      title: reel.title,
      category: 'weddings',
      categoryLabel: reel.category,
      videoUrl: reel.videoUrl,
      posterUrl: reel.posterUrl,
      turnaroundTime: reel.turnaround.replace('⚡ ', ''),
      client: reel.title,
      eventDescription: 'Captured live on-site and delivered within 40 minutes before the celebration concluded.',
      viewsCount: '150K',
      aspectRatio: '9:16',
      musicTrack: 'Trending Audio Track',
      featured: true,
    });
  };

  return (
    <section className="relative pt-28 sm:pt-32 pb-16 md:pb-24 overflow-hidden bg-gradient-to-b from-surface-50 via-white to-white">
      {/* Background Subtle Ambience Glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-dot-pattern opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand Statement & CTA */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            
            {/* Live Delivery Announcement Chip */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200/80 text-brand-700 text-xs font-bold uppercase tracking-wider mb-6 shadow-sm animate-pulse-slow">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-600"></span>
              </span>
              <span>{SITE_CONTENT.hero.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-surface-950 leading-[1.08] mb-6">
              {SITE_CONTENT.hero.headlinePart1} <br />
              {SITE_CONTENT.hero.headlinePart2} <br />
              <span className="text-gradient-red">{SITE_CONTENT.hero.headlineAccent}</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-zinc-600 max-w-xl font-normal leading-relaxed mb-8">
              {SITE_CONTENT.hero.subheadline}
            </p>

            {/* Call to Actions */}
            <div className="w-full sm:w-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                onClick={onOpenBooking}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-brand-600 text-white font-bold text-base shadow-xl shadow-brand-600/25 hover:bg-brand-700 hover:shadow-glow-lg transition-all duration-300 transform active:scale-95 cursor-pointer"
              >
                <span>{SITE_CONTENT.hero.primaryCta}</span>
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <a
                href="#portfolio"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-white text-zinc-800 font-semibold text-base border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 shadow-sm transition-all duration-200"
              >
                <Film className="w-4 h-4 text-brand-600" />
                <span>{SITE_CONTENT.hero.secondaryCta}</span>
              </a>
            </div>

          </div>

          {/* Right Column: Cinematic 9:16 Vertical Reel Experience */}
          <div className="lg:col-span-6 relative flex items-center justify-center py-4 lg:py-0">
            
            {/* Visual Multi-Reel Stage */}
            <div className="relative w-full max-w-[480px] h-[520px] sm:h-[600px] flex items-center justify-center">
              
              {/* Left Layered Reel Card (Background Left) */}
              <div 
                onClick={() => handleHeroReelClick(1)}
                className="hidden sm:block absolute left-0 w-[200px] h-[360px] rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-zinc-900 opacity-70 -rotate-6 hover:rotate-0 hover:opacity-100 hover:z-30 hover:scale-105 transition-all duration-500 cursor-pointer -translate-x-4"
              >
                <video
                  src={HERO_REELS[1].videoUrl}
                  poster={HERO_REELS[1].posterUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">{HERO_REELS[1].badge}</span>
                  <span className="text-xs font-semibold truncate">{HERO_REELS[1].title}</span>
                  <span className="text-[10px] text-emerald-400 font-medium">{HERO_REELS[1].turnaround}</span>
                </div>
              </div>

              {/* Right Layered Reel Card (Background Right) */}
              <div 
                onClick={() => handleHeroReelClick(2)}
                className="hidden sm:block absolute right-0 w-[200px] h-[360px] rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-zinc-900 opacity-70 rotate-6 hover:rotate-0 hover:opacity-100 hover:z-30 hover:scale-105 transition-all duration-500 cursor-pointer translate-x-4"
              >
                <video
                  src={HERO_REELS[2].videoUrl}
                  poster={HERO_REELS[2].posterUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-400">{HERO_REELS[2].badge}</span>
                  <span className="text-xs font-semibold truncate">{HERO_REELS[2].title}</span>
                  <span className="text-[10px] text-emerald-400 font-medium">{HERO_REELS[2].turnaround}</span>
                </div>
              </div>

              {/* Center Spotlight Reel (Primary Focus) */}
              <div className="relative z-20 w-[270px] sm:w-[310px] h-[480px] sm:h-[550px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-black transition-transform duration-300 hover:scale-[1.02]">
                
                {/* Main 9:16 Video */}
                <video
                  ref={centerVideoRef}
                  src={HERO_REELS[0].videoUrl}
                  poster={HERO_REELS[0].posterUrl}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  className="w-full h-full object-cover"
                />

                {/* Top Video Header Overlay */}
                <div className="absolute top-0 inset-x-0 p-4 bg-gradient-to-b from-black/70 via-black/30 to-transparent flex items-center justify-between text-white z-10">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-brand-500 animate-ping"></span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-white/90">Instant Reel</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {/* Audio Toggle */}
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-brand-600 transition-colors"
                      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    {/* Expand to Lightbox Modal */}
                    <button
                      onClick={() => handleHeroReelClick(0)}
                      className="p-2 rounded-full bg-black/50 backdrop-blur-md text-white hover:bg-brand-600 transition-colors"
                      aria-label="Open Fullscreen Reel Lightbox"
                      title="Expand Reel"
                    >
                      <Maximize2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Center Play/Pause Trigger */}
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors group cursor-pointer"
                  aria-label={isPlaying ? "Pause video" : "Play video"}
                >
                  {!isPlaying && (
                    <div className="w-16 h-16 rounded-full bg-brand-600/90 text-white flex items-center justify-center shadow-glow-lg backdrop-blur-sm transition-transform group-hover:scale-110">
                      <Play className="w-8 h-8 ml-1" fill="currentColor" />
                    </div>
                  )}
                </button>

                {/* Bottom Story & Metrics Card */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white z-10">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/30 border border-emerald-400/50 text-[11px] font-bold text-emerald-300">
                      {HERO_REELS[0].turnaround}
                    </span>
                    <span className="text-[11px] text-zinc-300 font-medium">Taj Palace, Mumbai</span>
                  </div>

                  <h2 className="text-sm sm:text-base font-bold leading-tight mb-1 text-white">
                    {HERO_REELS[0].title}
                  </h2>

                  <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-brand-400" />
                      4K 60fps Cinema Edit
                    </span>
                    <button
                      onClick={() => handleHeroReelClick(0)}
                      className="text-white hover:text-brand-400 font-semibold underline underline-offset-2 flex items-center gap-0.5"
                    >
                      Watch Full
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>

              {/* Floating Speed Pill Badge */}
              <div className="absolute -bottom-4 right-2 sm:right-4 z-30 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-xl border border-zinc-200 flex items-center gap-3 animate-float">
                <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[11px] uppercase font-bold tracking-wider text-zinc-400">Delivered On-Site</span>
                  <span className="text-xs font-extrabold text-surface-950">Under 45 Minutes</span>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
