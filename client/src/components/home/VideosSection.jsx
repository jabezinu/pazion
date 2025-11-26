import { memo } from 'react';

function VideosSection({ videos, videosLoading, getEmbedUrl }) {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Customer Experiences
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Watch real stories from our satisfied customers sharing their gemstone journey
          </p>
        </div>

        {videosLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : videos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.map((video, idx) => (
              <div
                key={video._id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden transform hover:scale-105 hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <div className="p-2">
                    <iframe
                      src={getEmbedUrl(video.url)}
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-xl w-full h-64 sm:h-80 md:h-96"
                      title={video.title}
                    ></iframe>
                  </div>
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
                    Video {idx + 1}
                  </div>
                </div>
                <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors">
                    {video.title}
                  </h3>
                  {video.description && (
                    <p className="text-gray-700 text-sm leading-relaxed">
                      {video.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No videos available</h3>
            <p className="text-gray-600">Check back soon for customer testimonials and experiences.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(VideosSection);