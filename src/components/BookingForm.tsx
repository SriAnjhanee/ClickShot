import React, { useState } from 'react';
import { SITE_CONTENT } from '../data/content';
import { 
  Calendar, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  Film, 
  Send, 
  MessageCircle, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingFormProps {
  initialEventType?: string;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialEventType = 'Weddings & Celebrations',
  isModal = false,
  onCloseModal,
}) => {
  const { brand } = SITE_CONTENT;
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: initialEventType,
    eventDate: '',
    location: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const eventTypes = [
    'Weddings & Celebrations',
    'Birthdays & Private Parties',
    'Business & Brand Events',
    'Personal Shoots & Creators',
    'Products, Cafes & Retail',
    'Special Occasions & Pop-Ups',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  const SCRIPT_URL =
    'https://script.google.com/macros/s/AKfycbzLJkpiPUWmasB9ajTMfxLDKHIvLL66IBc4DJp9H3P2Q1BQQXHxN4eeQn6d2nPw7EUN/exec';

  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify({
        fullName: formData.name,
        phone: formData.phone,
        email: formData.email,
        shootType: formData.eventType,
        eventDate: formData.eventDate,
        venue: formData.location,
        message: formData.notes,
      }),
    });

    setLoading(false);
    setSubmitted(true);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E11D48', '#FF1E41', '#10B981', '#000000', '#F59E0B'],
    });

  } catch (error) {
    console.error('Form submission error:', error);
    setLoading(false);
    alert('Something went wrong. Please try again.');
  }
};

  function handleReset() {
    setSubmitted(false);
    setFormData({
      name: '',
      phone: '',
      email: '',
      eventType: 'Weddings & Celebrations',
      eventDate: '',
      location: '',
      notes: '',
    });
  }

  const formBody = (
    <div className="relative">
      {isModal && onCloseModal && (
        <button
          onClick={onCloseModal}
          className="absolute top-0 right-0 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors z-20"
          aria-label="Close form"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-950 mb-2">
                Your Full Name *
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-surface-50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-sm font-medium text-surface-950 transition-all outline-none"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-950 mb-2">
                Phone / WhatsApp Number *
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="tel"
                  required
                  placeholder="e.g. +91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-surface-50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-sm font-medium text-surface-950 transition-all outline-none"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-950 mb-2">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="e.g. ananya@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-surface-50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-sm font-medium text-surface-950 transition-all outline-none"
                />
              </div>
            </div>

            {/* Event / Shoot Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-950 mb-2">
                Event / Shoot Type *
              </label>
              <div className="relative">
                <Film className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-surface-50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-sm font-medium text-surface-950 transition-all outline-none appearance-none"
                >
                  {eventTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Event Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-950 mb-2">
                Event Date *
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  required
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-surface-50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-sm font-medium text-surface-950 transition-all outline-none"
                />
              </div>
            </div>

            {/* Location / City */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-950 mb-2">
                Event City / Venue *
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Mumbai / Taj Lands End"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-surface-50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-sm font-medium text-surface-950 transition-all outline-none"
                />
              </div>
            </div>

          </div>

          {/* Tell Us About Your Shoot */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-surface-950 mb-2">
              Tell Us About Your Shoot & Vibe (Optional)
            </label>
            <textarea
              rows={3}
              placeholder="Tell us about the key moments (e.g. Varmala, afterparty, fashion runway, specific trending music preferences)..."
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              className="w-full p-4 rounded-xl border border-zinc-200 bg-surface-50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-sm font-medium text-surface-950 transition-all outline-none resize-none"
            />
          </div>

          {/* Actions & Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 inline-flex items-center justify-center gap-2.5 py-4 px-8 rounded-full bg-brand-600 text-white font-bold text-base shadow-lg shadow-brand-600/25 hover:bg-brand-700 hover:shadow-glow transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <span>Sending Request...</span>
              ) : (
                <>
                  <span>Request a ClickShot</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>

            <a
              href={brand.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 py-4 px-6 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 font-bold text-sm hover:bg-emerald-100 transition-colors"
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span>Instant WhatsApp</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 text-center">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Fast response guaranteed within 2 hours • No spam policy</span>
          </div>
        </form>
      ) : (
        /* Submission Confirmation State */
        <div className="py-12 text-center space-y-5 animate-in fade-in zoom-in-95 duration-300">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-surface-950">
            ClickShot Request Received!
          </h3>

          <p className="text-sm sm:text-base text-zinc-600 max-w-md mx-auto leading-relaxed">
            Thank you, <strong className="text-surface-950">{formData.name}</strong>! Our shoot coordinator is reviewing creator availability for <strong className="text-surface-950">{formData.eventType}</strong> on <strong className="text-surface-950">{formData.eventDate || 'your selected date'}</strong>.
          </p>

          <div className="p-4 rounded-2xl bg-surface-50 border border-zinc-200 max-w-md mx-auto text-left text-xs space-y-1.5 text-zinc-600">
            <div><strong>Contact:</strong> {formData.phone} ({formData.email})</div>
            <div><strong>Location:</strong> {formData.location}</div>
            <div className="text-emerald-700 font-semibold pt-1">⚡ We will reach out via WhatsApp / Call shortly!</div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <a
              href={`https://wa.me/916305718169?text=Hi%20ClickShot!%20I%20just%20submitted%20a%20request%20for%20${encodeURIComponent(formData.eventType)}%20on%20${encodeURIComponent(formData.eventDate)}.%20My%20name%20is%20${encodeURIComponent(formData.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-bold text-sm shadow-md hover:bg-emerald-700 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Connect Immediately on WhatsApp</span>
            </a>

            <button
              onClick={handleReset}
              className="px-5 py-3 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-sm font-semibold transition-colors cursor-pointer"
            >
              Submit Another Inquiry
            </button>
          </div>
        </div>
      )}
    </div>
  );

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
        <div className="absolute inset-0" onClick={onCloseModal} />
        <div className="relative z-10 w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-zinc-200 max-h-[90vh] overflow-y-auto">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
              Book a ClickShot Creator
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-surface-950">
              Reserve Your Instant Reel Shoot
            </h2>
          </div>
          {formBody}
        </div>
      </div>
    );
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-surface-50 border-t border-zinc-200/80 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-brand-600" />
            <span>Check Date Availability</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-surface-950 tracking-tight leading-tight mb-4">
            Book Your ClickShot Shoot
          </h2>

          <p className="text-base text-zinc-600">
            Tell us about your upcoming event. We guarantee same-day / on-site Reel delivery.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-zinc-200">
          {formBody}
        </div>

      </div>
    </section>
  );
};
