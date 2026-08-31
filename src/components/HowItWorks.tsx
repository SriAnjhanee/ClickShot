import React, { useState } from 'react';
import { SITE_CONTENT } from '../data/content';
import { Camera, Scissors, Send, Clock, CheckCircle2 } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const { howItWorks } = SITE_CONTENT;
  const [activeStep, setActiveStep] = useState(1);

  const stepIcons = [Camera, Scissors, Send];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-surface-950 tracking-tight leading-tight mb-5">
            {howItWorks.heading}
          </h2>

          <p className="text-base sm:text-lg text-zinc-600">
            {howItWorks.subheading}
          </p>
        </div>

        {/* Timeline Desktop Tabs & Visual Track */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mb-12 relative">
          
          {/* Connecting Red Accent Line Behind Numbers */}
          <div className="absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-zinc-200 -translate-y-12 -z-0">
            <div
              className="h-full bg-brand-600 transition-all duration-500"
              style={{ width: `${(activeStep / 2) * 100}%` }}
            />
          </div>

          {howItWorks.steps.map((step, idx) => {
            const Icon = stepIcons[idx];
            const isActive = activeStep === idx;

            return (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                onMouseEnter={() => setActiveStep(idx)}
                className={`relative z-10 text-left p-8 rounded-3xl transition-all duration-300 border cursor-pointer ${
                  isActive
                    ? 'bg-surface-950 text-white border-brand-600 shadow-2xl shadow-brand-600/10 scale-105'
                    : 'bg-surface-50 text-zinc-800 border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {/* Step Number & Icon */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`text-4xl font-extrabold font-display ${isActive ? 'text-brand-400' : 'text-zinc-300'}`}>
                    {step.number}
                  </span>
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold ${
                      isActive ? 'bg-brand-600 text-white shadow-glow' : 'bg-white text-zinc-700 border border-zinc-200'
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-brand-300' : 'text-zinc-500'}`}>
                  {step.subtitle}
                </div>

                <h3 className={`text-2xl font-bold mb-3 ${isActive ? 'text-white' : 'text-surface-950'}`}>
                  {step.title}
                </h3>

                <p className={`text-sm leading-relaxed mb-6 ${isActive ? 'text-zinc-300' : 'text-zinc-600'}`}>
                  {step.description}
                </p>

                {/* Bullet Points */}
                <div className={`pt-4 border-t space-y-2 text-xs ${isActive ? 'border-white/10' : 'border-zinc-200'}`}>
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2">
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-brand-400' : 'text-zinc-500'}`} />
                      <span className={isActive ? 'text-zinc-200' : 'text-zinc-700'}>{detail}</span>
                    </div>
                  ))}
                </div>
              </button>
            );
          })}
        </div>

        {/* Mobile Vertical Stack */}
        <div className="grid grid-cols-1 lg:hidden gap-6">
          {howItWorks.steps.map((step, idx) => {
            const Icon = stepIcons[idx];

            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-surface-50 border border-zinc-200 shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-extrabold font-display text-brand-600">
                    {step.number}
                  </span>
                  <div className="w-11 h-11 rounded-2xl bg-white border border-zinc-200 text-zinc-800 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-1">
                  {step.subtitle}
                </span>

                <h3 className="text-xl font-bold text-surface-950 mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-zinc-600 leading-relaxed mb-4">
                  {step.description}
                </p>

                <div className="pt-4 border-t border-zinc-200 space-y-2 text-xs text-zinc-700">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-600" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Turnaround Time Metric Callout */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-surface-100 border border-zinc-200 text-zinc-800 text-xs sm:text-sm font-semibold">
            <Clock className="w-4 h-4 text-brand-600" />
            <span>Average turnaround time from shoot end to finished Reel: <strong className="text-brand-600 font-extrabold">30 to 45 minutes</strong></span>
          </div>
        </div>

      </div>
    </section>
  );
};
