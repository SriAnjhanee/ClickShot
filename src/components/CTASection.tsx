import React from 'react';
import { SITE_CONTENT } from '../data/content';
import { ArrowUpRight, MessageCircle, Sparkles, Check } from 'lucide-react';

interface CTASectionProps {
  onOpenBooking: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({ onOpenBooking }) => {
  const { ctaBanner, brand } = SITE_CONTENT;

  return (
    <section className="py-20 md:py-28 bg-surface-950 text-white relative overflow-hidden">
      {/* Dynamic Red Glow Mesh */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[400px] bg-brand-600/30 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Top Chip */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-brand-300 text-xs font-bold uppercase tracking-wider mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Capture Your Next Milestone</span>
        </div>

        {/* Big Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 max-w-3xl mx-auto">
          {ctaBanner.headline}
        </h2>

        {/* Subhead */}
        <p className="text-base sm:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
          {ctaBanner.subheadline}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full bg-brand-600 text-white font-extrabold text-base shadow-xl shadow-brand-600/40 hover:bg-brand-500 hover:shadow-glow-lg transition-all duration-300 transform active:scale-95 cursor-pointer"
          >
            <span>{ctaBanner.primaryCta}</span>
            <ArrowUpRight className="w-5 h-5" />
          </button>

          <a
            href={brand.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-base backdrop-blur-md border border-white/20 transition-all duration-200"
          >
            <MessageCircle className="w-5 h-5 text-emerald-400" />
            <span>{ctaBanner.secondaryCta}</span>
          </a>
        </div>

        {/* Guarantee Points */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-zinc-400 font-medium pt-8 border-t border-white/10">
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            Same-Day / On-Site Reel Delivery
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            4K Cinema Quality & Trending Audio
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-400" />
            Zero Waiting Period
          </span>
        </div>

      </div>
    </section>
  );
};
