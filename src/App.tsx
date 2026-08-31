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
import type { ReelItem } from './data/portfolio';

export function App() {
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [selectedServiceForBooking, setSelectedServiceForBooking] = useState('Weddings & Celebrations');

  const handleOpenBooking = (serviceType?: string) => {
    if (serviceType) {
      setSelectedServiceForBooking(serviceType);
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
    <div className="min-h-screen bg-white text-surface-950 font-sans selection:bg-brand-600 selection:text-white flex flex-col">
      {/* Sticky Header */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* Main Content Sections */}
      <main className="flex-grow">
        {/* 1. Hero Section with Cinematic 9:16 Vertical Reel Multi-Stage */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onSelectReel={(reel) => setSelectedReel(reel)}
        />

        {/* 2. How ClickShot Works (3-Step Animated Timeline) */}
        <HowItWorks />

        {/* 3. Services */}
        <Services />

        {/* 4. Location */}
        <Location />

        {/* 4. Why ClickShot Differentiators */}
        <WhyUs />

        {/* 5. Testimonials - Hanging Cards */}
        <Testimonials />

        {/* 6. High-Impact CTA Banner */}
        <CTASection onOpenBooking={() => handleOpenBooking()} />

        {/* 6. Main Interactive Booking Section */}
        <BookingForm initialEventType={selectedServiceForBooking} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Full-Fidelity Reel Lightbox Modal */}
      <ReelModal
        reel={selectedReel}
        onClose={() => setSelectedReel(null)}
        onBookShoot={handleBookFromReel}
      />

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
