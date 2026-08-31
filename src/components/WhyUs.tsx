import React from 'react';
import { SITE_CONTENT } from '../data/content';
import { Zap, Smartphone, Sparkles, HeartHandshake, Clock, Flame } from 'lucide-react';

const iconMap: Record<string, React.FC<{ className?: string }>> = {
  Zap,
  Smartphone,
  Sparkles,
  HeartHandshake,
  Clock,
  Flame,
};

export const WhyUs: React.FC = () => {
  const { whyUs } = SITE_CONTENT;

  return (
    <section id="why-us" className="py-20 md:py-28 bg-surface-50 border-t border-zinc-200/80 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-surface-950 tracking-tight leading-tight mb-5">
            {whyUs.heading}
          </h2>

          <p className="text-base sm:text-lg text-zinc-600">
            {whyUs.subheading}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {whyUs.benefits.slice(0, 3).map((benefit, idx) => {
            const Icon = iconMap[benefit.icon] || Zap;

            return (
              <div
                key={idx}
                className="group relative p-8 rounded-3xl bg-white border border-zinc-200 shadow-sm hover:shadow-card-hover hover:border-brand-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-surface-950 mb-3 group-hover:text-brand-600 transition-colors">
                    {benefit.title}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center text-xs font-bold text-brand-600">
                  <span>ClickShot Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
