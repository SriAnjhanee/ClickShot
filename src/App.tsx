import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { Location } from './components/Location';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Testimonials } from './components/Testimonials';
import { CTASection } from './components/CTASection';
import { BookingForm } from './components/BookingForm';
import { Footer } from './components/Footer';
import { ReelModal } from './components/ReelModal';
import { ReelMakerPage } from './components/ReelMakerPage';
import type { ReelItem } from './data/portfolio';

export function App() {
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('');
  const isRecruitmentPage = window.location.pathname.replace(/\/+$/, '') === '/become-a-reel-maker';

  const handleOpenBooking = (serviceType?: string) => {
    if (serviceType) {
      setSelectedServiceForBooking(serviceType);
    } else {
      setSelectedServiceForBooking('');
    }
    setBookingModalOpen(true);
  };

  const handleBookFromReel = (serviceCategory: string) => {
    setSelectedReel(null);
    setSelectedServiceForBooking(serviceCategory);
    // Scroll smoothly to the booking section
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      setBookingModalOpen(true);
    }
  };

  return (
    <div className={`min-h-screen bg-white text-surface-950 font-sans selection:bg-brand-600 selection:text-white flex flex-col ${isRecruitmentPage ? 'reel-maker-shell' : ''}`}>
      {/* Sticky Header */}
      <Navbar onOpenBooking={() => handleOpenBooking()} isRecruitmentPage={isRecruitmentPage} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {isRecruitmentPage ? (
          <ReelMakerPage />
        ) : (
          <>
            <Hero
              onOpenBooking={() => handleOpenBooking()}
              onSelectReel={(reel) => setSelectedReel(reel)}
            />
            <HowItWorks />
            <Services />
            <Location />
            <WhyUs />
            <Testimonials />
            <CTASection onOpenBooking={() => handleOpenBooking()} />
            <BookingForm initialEventType={selectedServiceForBooking} />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer isRecruitmentPage={isRecruitmentPage} />

      {/* Full-Fidelity Reel Lightbox Modal */}
      {!isRecruitmentPage && (
        <ReelModal
          reel={selectedReel}
          onClose={() => setSelectedReel(null)}
          onBookShoot={handleBookFromReel}
        />
      )}

      {/* Quick Booking Modal */}
      {bookingModalOpen && (
        <BookingForm
          isModal={true}
          initialEventType={selectedServiceForBooking}
          onCloseModal={() => setBookingModalOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
