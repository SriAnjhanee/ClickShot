import React from 'react';
import { SITE_CONTENT } from '../data/content';
import { Star } from 'lucide-react';

const hangClasses = ['hang-1', 'hang-2', 'hang-3', 'hang-4', 'hang-5', 'hang-6'];
const tiltClasses = ['-rotate-2', 'rotate-1', '-rotate-1', 'rotate-2', '-rotate-3', 'rotate-1'];

const CARD_WIDTH = 288; // w-72 = 288px
const CARD_GAP = 32;    // mx-4 each side = 32px total
const CARD_TOTAL = CARD_WIDTH + CARD_GAP;

// SVG catenary rope spanning the full scrolling track
const RopeOverlay: React.FC<{ count: number }> = ({ count }) => {
  const totalWidth = count * CARD_TOTAL;
  const pinY = 10;
  const sagDepth = 28; // how much the rope sags between pins

  // Build SVG path: M to first pin, then quadratic curves sagging between each pin
  let d = `M ${CARD_TOTAL / 2} ${pinY}`;
  for (let i = 1; i < count; i++) {
    const x1 = i * CARD_TOTAL - CARD_TOTAL / 2; // next pin x
    const prevX = (i - 1) * CARD_TOTAL + CARD_TOTAL / 2;
    const midX = (prevX + x1) / 2;
    d += ` Q ${midX} ${pinY + sagDepth} ${x1} ${pinY}`;
  }

  return (
    <svg
      className="absolute top-0 left-0 pointer-events-none z-10"
      width={totalWidth}
      height={pinY + sagDepth + 4}
      style={{ minWidth: totalWidth }}
    >
      <path
        d={d}
        fill="none"
        stroke="#a1a1aa"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="6 4"
      />
    </svg>
  );
};

const TestimonialCard: React.FC<{
  t: typeof SITE_CONTENT.testimonials[0];
  idx: number;
}> = ({ t, idx }) => (
  <div className="flex flex-col items-center flex-shrink-0 w-72 mx-4">
    {/* Pin */}
    <div className="relative z-20 flex flex-col items-center" style={{ marginBottom: '-2px' }}>
      <div className="w-4 h-4 rounded-full bg-brand-600 border-2 border-white shadow-md" />
      <div className="w-px bg-zinc-400" style={{ height: '20px' }} />
    </div>

    {/* Card */}
    <div className={`${hangClasses[idx % 6]} ${tiltClasses[idx % 6]} w-full`}>
      <div className="bg-white rounded-2xl shadow-lg border border-zinc-100 p-5 hover:shadow-2xl transition-all duration-300">
        {/* Stars */}
        <div className="flex gap-0.5 mb-3">
          {Array.from({ length: t.rating }).map((_, s) => (
            <Star key={s} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          ))}
        </div>

        {/* Quote */}
        <p className="text-zinc-600 text-sm leading-relaxed mb-4">
          "{t.quote}"
        </p>

        {/* Client */}
        <div className="border-t border-zinc-100 pt-3 flex items-center justify-between">
          <div>
            <p className="text-zinc-900 font-bold text-sm">{t.name}</p>
            <p className="text-brand-600 text-xs font-medium mt-0.5">{t.event}</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center shadow-sm flex-shrink-0">
            <span className="text-white text-xs font-black">CS</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export const Testimonials: React.FC = () => {
  const testimonials = SITE_CONTENT.testimonials;
  const doubled = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-white overflow-hidden">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-600 text-sm font-semibold mb-4">
          Client Stories
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-950 tracking-tight leading-tight mb-4">
          Moments They'll Never Forget
        </h2>
        <p className="text-zinc-500 max-w-xl mx-auto text-base">
          Real words from real clients who got their Reel before the night was over.
        </p>
      </div>

      {/* Scrolling rope + cards */}
      <div className="relative">
        {/* Track */}
        <div className="relative flex animate-scroll-right" style={{ width: 'max-content' }}>
          {/* SVG curved rope spanning entire track */}
          <RopeOverlay count={doubled.length} />

          {doubled.map((t, i) => (
            <TestimonialCard key={i} t={t} idx={i % testimonials.length} />
          ))}
        </div>

        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-28 bg-gradient-to-r from-white to-transparent pointer-events-none z-30" />
        <div className="absolute right-0 top-0 bottom-0 w-28 bg-gradient-to-l from-white to-transparent pointer-events-none z-30" />
      </div>
    </section>
  );
};
