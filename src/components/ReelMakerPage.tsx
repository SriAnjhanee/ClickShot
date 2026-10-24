import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, Check, Film } from 'lucide-react';
import { CLICKSHOT_WHATSAPP_NUMBER } from '../data/content';

interface ApplicationData {
  fullName: string;
  mobileNumber: string;
  city: string;
  currentStatus: string;
  phoneModel: string;
  experience: string;
  skills: string;
  portfolio: string;
  availability: string;
}

type ApplicationField = keyof ApplicationData | 'skills';
type ValidationErrors = Partial<Record<ApplicationField, string>>;

const STATUS_OPTIONS = ['Student', 'Freelancer', 'Working Professional', 'Other'];
const EXPERIENCE_OPTIONS = [
  'Beginner — strong interest',
  'Less than 1 year',
  '1–2 years',
  '2+ years',
];
const SKILL_OPTIONS = [
  'Editing',
  'Videography',
  'Editing + Videography',
];
const IPHONE_MODELS = [
  'iPhone 17 Pro Max', 'iPhone 17 Pro', 'iPhone Air', 'iPhone 17',
  'iPhone 16 Pro Max', 'iPhone 16 Pro', 'iPhone 16 Plus', 'iPhone 16',
  'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
  'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
  'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13 mini', 'iPhone 13',
  'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12 mini', 'iPhone 12',
  'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
  'iPhone XS Max', 'iPhone XS', 'iPhone XR', 'iPhone X',
  'iPhone 8 Plus', 'iPhone 8', 'iPhone 7 Plus', 'iPhone 7',
  'iPhone 6s Plus', 'iPhone 6s', 'iPhone 6 Plus', 'iPhone 6',
  'iPhone 5s', 'iPhone 5c', 'iPhone 5', 'iPhone 4s', 'iPhone 4',
  'iPhone SE (3rd generation)', 'iPhone SE (2nd generation)', 'iPhone SE (1st generation)',
  'Other iPhone model',
];

const controlClassName = 'w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition focus-visible:border-brand-600 focus-visible:ring-2 focus-visible:ring-brand-600/25';

function FieldError({ id, message }: { id: string; message?: string }) {
  return message ? <p id={id} className="mt-1.5 text-sm font-medium text-red-700" role="alert">{message}</p> : null;
}

export const ReelMakerPage: React.FC = () => {
  const [application, setApplication] = useState<ApplicationData>({
    fullName: '',
    mobileNumber: '',
    city: '',
    currentStatus: '',
    phoneModel: '',
    experience: '',
    skills: '',
    portfolio: '',
    availability: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [whatsAppNotice, setWhatsAppNotice] = useState<{ blocked: boolean; url: string } | null>(null);

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const previousDescription = description?.content;

    document.title = 'Become a Reel Maker | ClickShot';
    if (description) {
      description.content = 'Join ClickShot as a Reel Maker. Shoot real projects, build practical experience, and grow your creative portfolio.';
    }

    return () => {
      document.title = previousTitle;
      if (description && previousDescription) description.content = previousDescription;
    };
  }, []);

  const updateField = <K extends keyof ApplicationData>(field: K, value: ApplicationData[K]) => {
    setApplication((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setWhatsAppNotice(null);
  };

  const validate = (): ValidationErrors => {
    const nextErrors: ValidationErrors = {};
    if (!application.fullName.trim()) nextErrors.fullName = 'Enter your full name.';

    if (!application.mobileNumber.trim()) {
      nextErrors.mobileNumber = 'Enter your mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(application.mobileNumber)) {
      nextErrors.mobileNumber = 'Enter a valid 10-digit Indian mobile number.';
    }

    const city = application.city.trim();
    if (!city) {
      nextErrors.city = 'Enter your city.';
    } else if (city.length < 2 || city.length > 80 || !/\p{L}/u.test(city)) {
      nextErrors.city = 'Enter a valid city name using at least two characters.';
    }
    if (!application.currentStatus) nextErrors.currentStatus = 'Choose your current status.';
    if (!application.phoneModel.trim()) nextErrors.phoneModel = 'Enter the phone model you use.';
    if (!application.experience) nextErrors.experience = 'Choose your experience level.';
    if (!application.skills) nextErrors.skills = 'Choose a skill.';

    if (application.portfolio.trim()) {
      try {
        const portfolioUrl = new URL(application.portfolio.trim());
        if (!['http:', 'https:'].includes(portfolioUrl.protocol)) throw new Error('Unsupported URL protocol');
      } catch {
        nextErrors.portfolio = 'Enter a valid link beginning with https://';
      }
    }

    return nextErrors;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setWhatsAppNotice(null);
    const validationErrors = validate();
    setErrors(validationErrors);

    const firstInvalidField = Object.keys(validationErrors)[0] as ApplicationField | undefined;
    if (firstInvalidField) {
      const focusTarget = firstInvalidField === 'skills'
        ? 'application-skills'
        : `application-${firstInvalidField}`;
      document.getElementById(focusTarget)?.focus();
      return;
    }

    const message = [
      'ClickShot Reel Maker Application',
      '',
      `Name: ${application.fullName.trim()}`,
      `Mobile: ${application.mobileNumber.trim()}`,
      `City: ${application.city.trim()}`,
      `Current status: ${application.currentStatus}`,
      `Phone model: ${application.phoneModel.trim()}`,
      `Experience: ${application.experience}`,
      `Skills: ${application.skills}`,
      ...(application.portfolio.trim() ? [`Portfolio / Instagram: ${application.portfolio.trim()}`] : []),
      ...(application.availability.trim() ? [`Availability / note: ${application.availability.trim()}`] : []),
    ].join('\n');
    const url = `https://wa.me/${CLICKSHOT_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    const chatWindow = window.open(url, '_blank');

    if (chatWindow) {
      chatWindow.opener = null;
      setWhatsAppNotice({ blocked: false, url });
    } else {
      setWhatsAppNotice({ blocked: true, url });
    }
  };

  return (
    <div className="reel-maker-page">
      <section className="reel-maker-hero relative overflow-hidden bg-white">
        <div className="absolute inset-y-0 right-0 hidden w-[36%] bg-brand-600 lg:block" aria-hidden="true" />
        <div className="absolute inset-0 bg-dot-pattern opacity-30 pointer-events-none" aria-hidden="true" />
        <div className="reel-maker-hero-grid relative mx-auto grid w-full max-w-7xl items-center gap-8 px-3 sm:gap-12 sm:px-6 lg:px-8">
          <div className="min-w-0">
            <p className="reel-maker-eyebrow mb-5 inline-flex items-center gap-2 text-xs font-extrabold uppercase text-brand-700">
              <span className="h-2 w-2 rounded-full bg-brand-600" />
              For students &amp; creators
            </p>
            <h1 className="reel-maker-title max-w-3xl font-extrabold leading-[1.08] text-zinc-950">
              Turn your free time into <span className="text-gradient-red">creative work.</span>
            </h1>
            <p className="reel-maker-intro mt-6 max-w-2xl text-zinc-600">
              Join ClickShot as a Reel Maker. Shoot real projects, build practical experience, and grow your creative portfolio.
            </p>
            <a
              href="#application"
              className="mt-8 inline-flex items-center justify-center gap-3 rounded-full bg-brand-600 px-7 py-4 text-sm font-extrabold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2"
            >
              BECOME A REEL MAKER <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>

          <div className="relative min-w-0 lg:pl-8">
            <div className="reel-maker-promo relative z-10 mx-auto w-full max-w-md border border-zinc-200 bg-white shadow-xl shadow-zinc-900/5">
              <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
                <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
                  <Film className="h-4 w-4 text-brand-600" /> Creator network
                </span>
                <span className="text-xs font-bold text-brand-700">CLICKSHOT / 01</span>
              </div>
              <p className="reel-maker-promo-title mt-8 font-black leading-none text-zinc-950">MAKE IT<br /><span className="text-brand-600">MOVE.</span></p>
              <div className="mt-8 flex items-end justify-between gap-4">
                <p className="max-w-[13rem] text-sm leading-6 text-zinc-600">Real events. Real creative work. A portfolio that keeps growing.</p>
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-700"><ArrowUpRight className="h-6 w-6" /></span>
              </div>
            </div>
            <div className="absolute -right-3 -top-5 h-28 w-28 border-2 border-brand-300 lg:-right-4" aria-hidden="true" />
          </div>
        </div>
      </section>

      <div className="reel-maker-workspace mx-auto w-full max-w-7xl px-3 py-10 sm:px-6 sm:py-14 lg:px-8">
        <section id="application" className="reel-maker-application min-w-0 scroll-mt-24" aria-labelledby="application-heading">
          <div className="reel-maker-form-panel min-w-0 border border-zinc-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand-700">Application</p>
            <h2 id="application-heading" className="mt-2 text-3xl font-extrabold leading-tight text-zinc-950 sm:text-4xl">Become a Reel Maker</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-600">Tell us a little about yourself and your creative skills. Your application will open as a pre-filled WhatsApp message to the ClickShot team.</p>
            <form noValidate onSubmit={handleSubmit} className="mt-7 space-y-6" aria-describedby="application-privacy-note">
              <div className="reel-maker-field-grid grid gap-x-5 gap-y-5">
                <div>
                  <label htmlFor="application-fullName" className="mb-2 block text-sm font-bold text-zinc-800">Full Name <span className="text-brand-700" aria-hidden="true">*</span></label>
                  <input id="application-fullName" name="fullName" type="text" autoComplete="name" required value={application.fullName} onChange={(event) => updateField('fullName', event.target.value)} aria-invalid={!!errors.fullName} aria-describedby={errors.fullName ? 'application-fullName-error' : undefined} className={controlClassName} />
                  <FieldError id="application-fullName-error" message={errors.fullName} />
                </div>
                <div>
                  <label htmlFor="application-mobileNumber" className="mb-2 block text-sm font-bold text-zinc-800">Mobile Number <span className="text-brand-700" aria-hidden="true">*</span></label>
                  <input id="application-mobileNumber" name="mobileNumber" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={10} placeholder="9876543210" required value={application.mobileNumber} onChange={(event) => updateField('mobileNumber', event.target.value.replace(/\D/g, '').slice(0, 10))} aria-invalid={!!errors.mobileNumber} aria-describedby={errors.mobileNumber ? 'application-mobileNumber-error' : undefined} className={controlClassName} />
                  <FieldError id="application-mobileNumber-error" message={errors.mobileNumber} />
                </div>
                <div>
                  <label htmlFor="application-city" className="mb-2 block text-sm font-bold text-zinc-800">City <span className="text-brand-700" aria-hidden="true">*</span></label>
                  <input id="application-city" name="city" type="text" autoComplete="address-level2" required value={application.city} onChange={(event) => updateField('city', event.target.value)} aria-invalid={!!errors.city} aria-describedby={errors.city ? 'application-city-error' : undefined} className={controlClassName} />
                  <FieldError id="application-city-error" message={errors.city} />
                </div>
                <div>
                  <label htmlFor="application-currentStatus" className="mb-2 block text-sm font-bold text-zinc-800">Current Status <span className="text-brand-700" aria-hidden="true">*</span></label>
                  <select id="application-currentStatus" name="currentStatus" required value={application.currentStatus} onChange={(event) => updateField('currentStatus', event.target.value)} aria-invalid={!!errors.currentStatus} aria-describedby={errors.currentStatus ? 'application-currentStatus-error' : undefined} className={controlClassName}>
                    <option value="">Select your status</option>
                    {STATUS_OPTIONS.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <FieldError id="application-currentStatus-error" message={errors.currentStatus} />
                </div>
                <div>
                  <label htmlFor="application-phoneModel" className="mb-2 block text-sm font-bold text-zinc-800">Phone Model <span className="text-brand-700" aria-hidden="true">*</span></label>
                  <select id="application-phoneModel" name="phoneModel" required value={application.phoneModel} onChange={(event) => updateField('phoneModel', event.target.value)} aria-invalid={!!errors.phoneModel} aria-describedby={errors.phoneModel ? 'application-phoneModel-error' : undefined} className={controlClassName}>
                    <option value="">Choose your iPhone model</option>
                    {IPHONE_MODELS.map((model) => <option key={model} value={model}>{model}</option>)}
                  </select>
                  <FieldError id="application-phoneModel-error" message={errors.phoneModel} />
                </div>
                <div>
                  <label htmlFor="application-experience" className="mb-2 block text-sm font-bold text-zinc-800">Experience <span className="text-brand-700" aria-hidden="true">*</span></label>
                  <select id="application-experience" name="experience" required value={application.experience} onChange={(event) => updateField('experience', event.target.value)} aria-invalid={!!errors.experience} aria-describedby={errors.experience ? 'application-experience-error' : undefined} className={controlClassName}>
                    <option value="">Choose experience level</option>
                    {EXPERIENCE_OPTIONS.map((option) => <option key={option}>{option}</option>)}
                  </select>
                  <FieldError id="application-experience-error" message={errors.experience} />
                </div>
              </div>

              <div>
                <label htmlFor="application-skills" className="mb-2 block text-sm font-bold text-zinc-800">Your Skills <span className="text-brand-700" aria-hidden="true">*</span></label>
                <select id="application-skills" name="skills" required value={application.skills} onChange={(event) => updateField('skills', event.target.value)} aria-invalid={!!errors.skills} aria-describedby={errors.skills ? 'application-skills-error' : undefined} className={controlClassName}>
                  <option value="">Choose a skill</option>
                  {SKILL_OPTIONS.map((skill) => <option key={skill} value={skill}>{skill}</option>)}
                </select>
                <FieldError id="application-skills-error" message={errors.skills} />
              </div>

              <div className="reel-maker-optional-grid grid gap-x-5 gap-y-5">
                <div>
                  <label htmlFor="application-portfolio" className="mb-2 block text-sm font-bold text-zinc-800">Portfolio / Instagram Link <span className="font-normal text-zinc-500">(optional)</span></label>
                  <input id="application-portfolio" name="portfolio" type="url" inputMode="url" autoComplete="url" placeholder="https://" value={application.portfolio} onChange={(event) => updateField('portfolio', event.target.value)} aria-invalid={!!errors.portfolio} aria-describedby={errors.portfolio ? 'application-portfolio-error' : undefined} className={controlClassName} />
                  <FieldError id="application-portfolio-error" message={errors.portfolio} />
                </div>
                <div>
                  <label htmlFor="application-availability" className="mb-2 block text-sm font-bold text-zinc-800">Availability / Note <span className="font-normal text-zinc-500">(optional)</span></label>
                  <textarea id="application-availability" name="availability" rows={3} value={application.availability} onChange={(event) => updateField('availability', event.target.value)} className={`${controlClassName} resize-y`} placeholder="When are you usually available?" />
                </div>
              </div>

              <div>
                <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-600 px-6 py-4 text-sm font-extrabold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 sm:w-auto">
                  SUBMIT APPLICATION ON WHATSAPP <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </button>
                {whatsAppNotice && (
                  <div className="mt-4 rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 text-zinc-700" role="status" aria-live="polite">
                    {whatsAppNotice.blocked ? (
                      <><p>WhatsApp could not be opened automatically. Continue to the prepared application and review it before sending.</p><a className="mt-2 inline-flex items-center gap-1 font-bold text-brand-700 underline underline-offset-2" href={whatsAppNotice.url} target="_blank" rel="noopener noreferrer">Open WhatsApp <ArrowUpRight className="h-4 w-4" /></a></>
                    ) : (
                      <span>WhatsApp opened with your application draft. Review it there and press Send when you’re ready.</span>
                    )}
                  </div>
                )}
              </div>

              <p id="application-privacy-note" className="flex items-start gap-2 border-t border-zinc-200 pt-4 text-xs leading-5 text-zinc-500"><Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" />Please do not send passwords, government IDs, or other sensitive documents through this form.</p>
            </form>
          </div>
      </section>
      </div>
    </div>
  );
};