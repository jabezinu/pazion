import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { memo } from 'react';

function ServicesSection({ t, services }) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.ourServices}</h2>
          <p className="text-xl text-gray-600">{t.servicesSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Link key={idx} to={service.path} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 cursor-pointer group">
              <service.icon className="w-12 h-12 text-blue-600 mb-4 group-hover:scale-110 transition" />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.desc}</p>
              <div className="flex items-center text-blue-600 font-semibold group-hover:gap-2 transition-all">
                {t.learnMore} <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ServicesSection);