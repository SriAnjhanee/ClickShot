import { MessageCircle } from 'lucide-react';
import { SITE_CONTENT } from '../data/content';

export const Location = () => {
  const { locations } = SITE_CONTENT;

  return (
    <section id="location" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-surface-950 tracking-tight leading-tight mb-5">
            {locations.heading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-600">
            {locations.subheading}
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {locations.cities.map((city) => (
            <div
              key={city.id}
              className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
            >
              {/* Background Image or Placeholder */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                style={{
                  backgroundImage: city.imageUrl ? `url(${city.imageUrl})` : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                }}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-300" />

              {/* WhatsApp Button */}
              <div className="absolute top-4 right-4 z-10">
                <a
                  href={SITE_CONTENT.brand.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-200 shadow-lg"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
              </div>

              {/* Location Name */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-3xl sm:text-4xl font-bold">{city.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
