import React, { useState } from 'react';
import { SITE_CONTENT } from '../data/content';
import { HelpCircle, ChevronDown, MessageCircle } from 'lucide-react';

export const FAQ: React.FC = () => {
  const { faqs, brand } = SITE_CONTENT;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5 text-brand-600" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-surface-950 tracking-tight leading-tight mb-4">
            Frequently Asked Questions
          </h2>

          <p className="text-base text-zinc-600">
            Everything you need to know about our instant delivery workflow.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen ? 'bg-surface-50 border-brand-300 shadow-sm' : 'bg-white border-zinc-200 hover:border-zinc-300'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-surface-950 pr-4">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'bg-brand-600 text-white rotate-180' : 'bg-zinc-100 text-zinc-600'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-zinc-600 leading-relaxed border-t border-zinc-100 animate-in fade-in duration-200">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Direct WhatsApp Prompt */}
        <div className="mt-12 text-center">
          <p className="text-sm text-zinc-600 mb-4">
            Have a specific question about your upcoming event or destination shoot?
          </p>
          <a
            href={brand.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-sm hover:bg-emerald-100 transition-colors shadow-sm"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>Chat Directly with our Shoot Coordinator</span>
          </a>
        </div>

      </div>
    </section>
  );
};
