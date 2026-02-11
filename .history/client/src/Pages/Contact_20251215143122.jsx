const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50 py-20 px-4 sm:px-8 lg:px-12">
      {/* Hero Section */}
      <div className="text-center mb-24 max-w-2xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light bg-gradient-to-r from-gray-800 via-gray-700 to-slate-900 bg-clip-text text-transparent mb-6 leading-tight">
          Contact <span className="font-medium bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Us</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-lg mx-auto leading-relaxed">Ready to transform your school management? Let's connect.</p>
      </div>

      {/* Contact Content */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Side - Visual */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500 -z-10"></div>
          <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl shadow-indigo-100/50 border border-white/50 hover:shadow-3xl hover:shadow-indigo-200/60 transition-all duration-500 group-hover:-translate-y-2">
            <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 p-8 flex items-center justify-center">
              <div className="text-6xl animate-pulse">🏢</div>
            </div>
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">Helphive HQ</h3>
              <p className="text-gray-500 text-sm">Fatehpur Gaya</p>
            </div>
          </div>
        </div>

        {/* Right Side - Contact Info */}
        <div className="space-y-8 lg:pl-8">
          {/* Office Info */}
          <div className="group">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-slate-700 bg-clip-text text-transparent mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 text-lg font-medium">📍</span>
              Our Office
            </h3>
            <div className="space-y-3 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 hover:bg-white/80 transition-all duration-300">
              <p className="text-gray-700 font-medium leading-relaxed">
                Chitragupta Bhawan<br />
                <span className="text-sm font-normal">Near Bus Stand, Fatehpur Gaya</span><br />
                824232, Bihar, India
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="group">
            <h3 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-slate-700 bg-clip-text text-transparent mb-4 flex items-center gap-3">
              <span className="w-10 h-10 bg-emerald-100 rounded-2xl flex items-center justify-center text-emerald-600 text-lg font-medium">📞</span>
              Get In Touch
            </h3>
            <div className="space-y-4 p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 hover:bg-white/80 transition-all duration-300">
              <p className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors">
                <span className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 text-sm font-medium">📱</span>
                +91-7050-6029-72
              </p>
              <p className="flex items-center gap-3 text-gray-700 hover:text-indigo-600 transition-colors">
                <span className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 text-sm font-medium">✉️</span>
                support@helphive.com
              </p>
            </div>
          </div>

          {/* Careers CTA */}
          <div className="pt-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2">
              👨‍💼 Careers at Helphive
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">Join our mission to revolutionize school management. Explore exciting opportunities.</p>
            <button className="group relative w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-5 rounded-2xl font-medium text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Explore Jobs
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>

      {/* Subtle bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-200 to-transparent pointer-events-none"></div>
    </div>
  )
}

export default Contact
