import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%)`
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">About Pazion</h1>
            <p className="text-xl md:text-2xl text-blue-100 font-light">
              Your Trusted Partner in the World of Precious Gemstones
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {/* Story Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">📖</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Story</h2>
              </div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2010, Pazion has been at the forefront of the gemstone industry, serving both local and international markets with unparalleled expertise and integrity.
                </p>
                <p>
                  Our journey began with a simple mission: to bridge the gap between gemstone enthusiasts, professionals, and the global market. Today, we are recognized as a trusted partner in the gemstone community.
                </p>
                <p>
                  With years of experience and a team of certified gemologists, we provide comprehensive services that cater to every aspect of the gemstone business.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-indigo-600 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Expertise</h2>
              </div>
              <ul className="space-y-4">
                {[
                  'Certified gemstone testing and authentication',
                  'International buying and selling network',
                  'Professional training and certification programs',
                  'State-of-the-art equipment and tools',
                  'Market analysis and trend forecasting'
                ].map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5 group-hover:bg-blue-600 transition-colors duration-300">
                      <svg className="w-3 h-3 text-blue-600 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-600 flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-2xl p-10 mb-20 text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: '🏆',
                  title: 'Excellence',
                  description: 'Committed to the highest standards in everything we do',
                  gradient: 'from-yellow-400 to-orange-500'
                },
                {
                  icon: '🤝',
                  title: 'Trust',
                  description: 'Building lasting relationships based on integrity and reliability',
                  gradient: 'from-green-400 to-emerald-500'
                },
                {
                  icon: '🌟',
                  title: 'Innovation',
                  description: 'Embracing new technologies and methods in gemstone services',
                  gradient: 'from-purple-400 to-pink-500'
                }
              ].map((value, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 hover:transform hover:scale-105">
                  <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center text-3xl mb-4 shadow-lg mx-auto`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-center">{value.title}</h3>
                  <p className="text-blue-100 text-center leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {[
              { number: '15+', label: 'Years Experience' },
              { number: '10K+', label: 'Satisfied Clients' },
              // { number: '50+', label: 'Expert Team' },
              { number: '10+', label: 'Countries Served' }
            ].map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <div className="text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Staff Members Section */}
          <div className="mb-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Meet Our Experts</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our team of dedicated professionals brings together decades of experience in the gemstone industry.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {[
                {
                  name: 'David Thompson',
                  role: 'Training Director',
                  image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
                  description: 'Leads our certification programs and professional development.',
                  expertise: ['Gemology', 'Education', 'Certification'],
                  social: {
                    linkedin: '#',
                    twitter: '#',
                  }
                },
                {
                  name: 'Lisa Park',
                  role: 'Client Relations Manager',
                  image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
                  description: 'Dedicated to providing exceptional service to our clients worldwide.',
                  expertise: ['Client Service', 'Global Markets', 'Consulting'],
                  social: {
                    linkedin: '#',
                    twitter: '#',
                  }
                },
                {
                  name: 'Robert Kim',
                  role: 'Technical Specialist',
                  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
                  description: 'Manages our state-of-the-art equipment and laboratory operations.',
                  expertise: ['Lab Operations', 'Gemstone Testing', 'Research'],
                  social: {
                    linkedin: '#',
                    twitter: '#',
                  }
                }
              ].map((member, index) => (
                <div key={index} className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-w-4 aspect-h-5">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-bold mb-2">{member.name}</h3>
                    <p className="text-blue-300 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-300 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                      {member.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                      {member.expertise.map((skill, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-600/30 rounded-full text-sm text-blue-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-300">
                      <a href={member.social.linkedin} className="text-white hover:text-blue-400 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                      <a href={member.social.twitter} className="text-white hover:text-blue-400 transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
            {/* <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who trust Pazion for their gemstone needs
            </p> */}
            <Link to="/contact">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:transform hover:scale-105 shadow-lg">
                Get in Touch
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}