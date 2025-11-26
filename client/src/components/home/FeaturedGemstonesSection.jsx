import { Link } from 'react-router-dom';
import { memo } from 'react';

function FeaturedGemstonesSection({ t, featuredGems }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.featuredGemstones}</h2>
          <p className="text-xl text-gray-600">{t.featuredSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredGems.map((gem, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={gem.image}
                  alt={gem.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {t.newLabel}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{gem.carat}</h3>
                <p className="text-gray-600 mb-4">{gem.name}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/gemstones">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg text-white px-10 py-4 rounded-full text-lg font-semibold transition transform hover:scale-105">
              {t.viewAllGemstones}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default memo(FeaturedGemstonesSection);