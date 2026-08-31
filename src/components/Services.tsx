import React, { useRef, useEffect } from 'react';
import { SITE_CONTENT } from '../data/content';
import vid2 from '../assets/green.mp4';
import vid3 from '../assets/baby shower.mp4';
import vid4 from '../assets/Marriage.mp4';

const LOCAL_VIDEOS = [vid2, vid3, vid4];

const { services } = SITE_CONTENT;

// Cards 2 & 4 are pushed down to create the staggered look
const OFFSETS = ['mt-0', 'mt-20', 'mt-0', 'mt-20'];

const ServiceCard: React.FC<{ item: typeof services.items[0]; offset: string; videoSrc: string }> = ({ item, offset, videoSrc }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;
        entry.isIntersecting
          ? videoRef.current.play().catch(() => {})
          : videoRef.current.pause();
      },
      { threshold: 0.25 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={cardRef} className={`flex flex-col ${offset}`}>
      {/* Video Card */}
      <div
        className="relative rounded-3xl overflow-hidden border border-zinc-200 shadow-sm bg-zinc-100"
        style={{ aspectRatio: '9/16' }}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Caption below card */}
      <div className="flex items-center justify-between mt-4 px-1">
        <span className="text-sm font-bold text-zinc-900">{item.title}</span>
        <span className="text-xs font-extrabold tracking-widest text-rose-600 uppercase">
          {item.category}
        </span>
      </div>
    </div>
  );
};

export const Services: React.FC = () => (
  <section id="services" className="py-20 md:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="inline-block px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 text-sm font-semibold mb-4">
          {services.badge}
        </span>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 mb-4">
          {services.heading}
        </h2>
        <p className="text-zinc-500 max-w-xl mx-auto">{services.subheading}</p>
      </div>

      {/* Staggered Reel Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-7 items-start">
        {services.items.map((item, i) => (
          <ServiceCard key={item.id} item={item} offset={OFFSETS[i]} videoSrc={LOCAL_VIDEOS[i]} />
        ))}
      </div>
    </div>
  </section>
);
