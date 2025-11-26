import { Star } from 'lucide-react';
import { memo } from 'react';

function TestimonialsSection({ t, testimonials, testimonialsLoading, currentTestimonial, setCurrentTestimonial }) {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t.testimonialTitle}</h2>
          <p className="text-xl text-gray-600">{t.testimonialSubtitle}</p>
        </div>

        {testimonialsLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : testimonials.length > 0 ? (
          <div className="relative">
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial._id || idx}
                className={`transition-opacity duration-500 ${
                  idx === currentTestimonial ? 'opacity-100' : 'opacity-0 absolute inset-0'
                }`}
              >
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-12 rounded-3xl shadow-xl">
                  <div className="flex justify-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-xl text-gray-700 text-center mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="text-center">
                    <p className="font-bold text-gray-900">{testimonial.author}</p>
                    <p className="text-gray-600">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition ${
                    idx === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No testimonials available.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(TestimonialsSection);