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
  ChevronDown,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookingFormProps {
  initialEventType?: string;
  isModal?: boolean;
  onCloseModal?: () => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  initialEventType = '',
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
    preferredTime: '',
    location: '',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');

  const minBookingDate = (() => {
    const today = new Date();
    const offset = today.getTimezoneOffset();
    const localDate = new Date(today.getTime() - offset * 60000);
    return localDate.toISOString().split('T')[0];
  })();

  const validatePhone = (value: string) => {
    const normalized = value.trim();
    const pattern = /^[6-9]\d{9}$/;
    return pattern.test(normalized);
  };

  const validateEmail = (value: string) => {
    const normalized = value.trim();

    if (!normalized) {
      return 'Email is required.';
    }

    if (/[\s]/.test(normalized)) {
      return 'Email cannot contain spaces.';
    }

    if (normalized.startsWith('@') || normalized.endsWith('@')) {
      return 'Please enter a valid email like name@domain.com';
    }

    if (normalized.includes('..')) {
      return 'Please enter a valid email like name@domain.com';
    }

    const basicPattern = /^[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,}$/i;
    if (!basicPattern.test(normalized)) {
      return 'Please enter a valid email like name@domain.com';
    }

    const [localPart, domain] = normalized.split('@');
    if (!localPart || !domain || domain.includes('..')) {
      return 'Please enter a valid email like name@domain.com';
    }

    const domainLower = domain.toLowerCase();
    const reservedDomains = ['example.com', 'example.org', 'example.net'];
    if (reservedDomains.includes(domainLower) || domainLower.endsWith('.example.com') || domainLower.endsWith('.example.org') || domainLower.endsWith('.example.net')) {
      return 'Example domains are not allowed. Please use your real email address.';
    }

    const blockedAddresses = [
      'sri@example.com',
      'test@test.com',
      'abc@abc.com',
      'test@gmail.com',
      'demo@demo.com',
      'sample@sample.com',
      'user@example.com',
      'admin@example.com',
      'noreply@example.com',
      'hello@example.com'
    ];

    if (blockedAddresses.includes(normalized.toLowerCase())) {
      return 'Please use a real email address instead of a placeholder or test address.';
    }

    const localLower = localPart.toLowerCase();
    const placeholderLocalParts = ['test', 'demo', 'sample', 'abc', 'user', 'admin', 'noreply', 'hello', 'placeholder'];
    if (placeholderLocalParts.includes(localLower)) {
      return 'Please use a real email address instead of a placeholder or test address.';
    }

    if (normalized.toLowerCase().endsWith('@gmail') || normalized.toLowerCase().endsWith('@yahoo') || normalized.toLowerCase().endsWith('@outlook') || normalized.toLowerCase().endsWith('@hotmail') || normalized.toLowerCase().endsWith('@icloud')) {
      return 'Please include the full domain, for example name@gmail.com';
    }

    if (!domain.includes('.')) {
      return 'Please include a valid domain, for example name@domain.com';
    }

    const domainParts = domain.split('.');
    const tld = domainParts[domainParts.length - 1];
    if (!tld || tld.length < 2) {
      return 'Please include a valid domain extension.';
    }

    return '';
  };

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

    if (!formData.eventType) {
      alert('Please select an event type.');
      return;
    }

    if (!formData.preferredTime) {
      alert('Please select your preferred time to call.');
      return;
    }

    const phoneValid = validatePhone(formData.phone);
    const emailValidationError = validateEmail(formData.email);

    if (!phoneValid) {
      alert('Please enter a valid Indian mobile number, for example +91 98765 43210 or 9876543210.');
      return;
    }

    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }

    setEmailError('');

    if (!formData.eventDate) {
      alert('Please select an event date.');
      return;
    }

    const selectedDate = new Date(`${formData.eventDate}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      alert('Please select today or a future date. Past dates are not allowed.');
      return;
    }

    setLoading(true);

    const SCRIPT_URL =
      'https://script.google.com/macros/s/AKfycbxOBrzPem7IKAQdZhnNas6VSTE3YL7kyUWXJzwEpsvHUSnw39_MbyFJgp4IRwe2Tmz-/exec';

    try {
      const response = await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify({
          action: 'submitBooking',
          fullName: formData.name,
          phone: `+91${formData.phone}`,
          email: formData.email,
          shootType: formData.eventType,
          eventDate: formData.eventDate,
          preferredTime: formData.preferredTime,
          venue: formData.location,
          message: formData.notes,
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.ok) {
        if (result.type === 'email') {
          setEmailError(result.message);
        }
        throw new Error(result.message || 'Unable to submit the booking.');
      }

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
      eventType: '',
      eventDate: '',
      preferredTime: '',
      location: '',
      notes: '',
    });
  }

  const formBody = (
    <div className="relative">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            
            {/* Full Name */}
            <div className="sm:col-span-2">
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
                <div className="w-full pl-10 flex items-center rounded-xl border border-zinc-200 bg-surface-50 focus-within:bg-white focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-600/20 transition-all">
                  <span className="pl-3 pr-2 text-sm font-semibold text-surface-600 border-r border-zinc-200">+91</span>
                  <input
                    type="tel"
                    required
                    inputMode="numeric"
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={(e) => {
                      const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 10);
                      setFormData({ ...formData, phone: digitsOnly });
                    }}
                    className="w-full px-3 py-3 bg-transparent text-sm font-medium text-surface-950 outline-none"
                  />
                </div>
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
                  onChange={(e) => {
                    const nextEmail = e.target.value;
                    setFormData({ ...formData, email: nextEmail });
                    const error = validateEmail(nextEmail);
                    setEmailError(error);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-surface-50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-sm font-medium text-surface-950 transition-all outline-none"
                />
              </div>
              {emailError && (
                <p className="mt-2 text-xs text-red-600 font-medium">{emailError}</p>
              )}
            </div>

            {/* Event / Shoot Type */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-950 mb-2">
                Event / Shoot Type *
              </label>
              <div className="relative">
                <Film className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  required
                  value={formData.eventType}
                  onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-zinc-200 bg-surface-50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-sm font-medium text-surface-950 transition-all outline-none appearance-none"
                >
                  <option value="" disabled>Select event type</option>
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
                  min={minBookingDate}
                  value={formData.eventDate}
                  onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-zinc-200 bg-surface-50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-sm font-medium text-surface-950 transition-all outline-none"
                />
              </div>
            </div>

            {/* Location / City */}
            {/* Preferred Call Time */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-surface-950 mb-2">
                Preferred Time to Call *
              </label>
              <div className="relative">
                <ChevronDown className="w-4 h-4 text-zinc-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  required
                  value={formData.preferredTime}
                  onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                  className="w-full px-4 pr-10 py-3 rounded-xl border border-zinc-200 bg-surface-50 focus:bg-white focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20 text-sm font-medium text-surface-950 transition-all outline-none appearance-none"
                >
                  <option value="" disabled>Select preferred time</option>
                  <option value="Anytime">Anytime</option>
                  <option value="Morning (9 AM to 12 PM)">Morning (9 AM to 12 PM)</option>
                  <option value="Afternoon (12 PM to 4 PM)">Afternoon (12 PM to 4 PM)</option>
                  <option value="Evening (4 PM to 8 PM)">Evening (4 PM to 8 PM)</option>
                </select>
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
                  placeholder="e.g. Amalapuram"
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
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
        <div className="absolute inset-0" onClick={onCloseModal} />
        <div className="relative z-10 w-full max-w-2xl bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 shadow-2xl border border-zinc-200 max-h-[calc(100vh-1.5rem)] sm:max-h-[90vh] overflow-y-auto">
          {onCloseModal && (
            <button
              onClick={onCloseModal}
              className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-600 transition-colors z-20"
              aria-label="Close form"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="mb-6 pr-12 sm:pr-14">
            <span className="text-xs font-bold uppercase tracking-wider text-brand-600 block mb-1">
              Book a ClickShot Creator
            </span>
            <h2 className="text-xl sm:text-3xl leading-tight font-extrabold text-surface-950">
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
