import { Link } from 'react-router-dom';
import { memo } from 'react';

function HeroSection({ t, currentHeroImage, setCurrentHeroImage, heroImages }) {
  return (
    <section className="relative h-[80vh] md:h-screen overflow-hidden">
      {heroImages.map((img, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            idx === currentHeroImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={img} alt="Gemstone" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        </div>
      ))}

      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-yellow-400 via-white to-yellow-200 bg-clip-text text-transparent mb-4 drop-shadow-2xl">
                KalGemstone
              </h1>
              <p className="text-3xl md:text-5xl font-light text-white/95 italic animate-pulse">
                Shine Like A Gemstone
              </p>
            </div>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              {t.heroSubtitle}
            </p>
            <p className="text-lg text-gray-300 mb-10">
              {t.heroDescription}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/gemstones">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105 shadow-xl">
                  {t.browseGemstones}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentHeroImage(idx)}
            className={`w-3 h-3 rounded-full transition ${
              idx === currentHeroImage ? 'bg-white w-8' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default memo(HeroSection);