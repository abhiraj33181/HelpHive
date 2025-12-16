const Contact = () => {
  return (
    <div className="min-h-screen bg-white py-24 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="max-w-2xl mx-auto text-center mb-24">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light text-gray-900 mb-6 leading-none">
          Contact
          <span className="block font-normal text-3xl sm:text-4xl lg:text-5xl text-gray-400">Us</span>
        </h1>
        <div className="w-24 h-1 bg-gray-900 mx-auto"></div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left - Office Visual */}
        <div className="relative">
          <div className="w-full aspect-[3/2] bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-center">
            <div className="text-7xl">🏢</div>
          </div>
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-3xl -z-10"></div>
        </div>

        {/* Right - Info */}
        <div className="space-y-12">
          {/* Office Address */}
          <div className="group">
            <h3 className="text-2xl font-normal text-gray-900 mb-6 flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center text-xl font-light">📍</div>
              Our Office
            </h3>
            <div className="p-8 border border-gray-100 rounded-3xl hover:border-gray-200 hover:bg-gray-50 transition-all duration-300">
              <p className="text-lg text-gray-700 leading-relaxed mb-2">
                Chitragupta Bhawan
              </p>
              <p className="text-sm text-gray-500 mb-4">
                Near Bus Stand, Fatehpur Gaya<br/>
                824232, Bihar, India
              </p>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-6 border border-gray-100 rounded-2xl hover:border-gray-200 hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center shrink-0 mt-1">
                <span className="text-emerald-600 text-xl">📞</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="text-lg font-semibold text-gray-900">+91-7050-6029-72</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 border border-gray-100 rounded-2xl hover:border-gray-200 hover:bg-gray-50 transition-all duration-300 group">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center shrink-0 mt-1">
                <span className="text-blue-600 text-xl">✉️</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="text-lg font-semibold text-gray-900 break-all">support@helphive.com</p>
              </div>
            </div>
          </div>

          {/* Careers */}
          <div className="pt-4">
            <h3 className="text-xl font-normal text-gray-900 mb-4">Careers at Helphive</h3>
            <p className="text-gray-600 mb-8 leading-relaxed max-w-md">
              Join our mission to revolutionize school management.
            </p>
            <button className="group relative px-8 py-5 text-lg font-normal text-gray-900 border-2 border-gray-900 rounded-2xl hover:bg-gray-900 hover:text-white transition-all duration-300 overflow-hidden">
              <span className="relative z-10">Explore Jobs</span>
              <div className="absolute inset-0 bg-gray-900 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
