import React from "react";
import { localServiceCategories } from "../assets/constant";

function Hero() {
  const isAuthenticated = false;

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto text-center">
        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-blue-900 leading-tight mb-6">
          Find trusted local helpers <br />
          <span className="text-blue-800">all in one place</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
          Book trusted local helpers for any task — plumbers, electricians, tutors, and more. 
          Affordable, reliable, and available anytime, anywhere.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-full px-8 py-3 text-lg transition-all duration-300 shadow-md hover:shadow-lg">
            {isAuthenticated ? "Book a Service" : "Find a Helper"}
          </button>

          <button className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-medium rounded-full px-8 py-3 text-lg transition-all duration-300">
            {isAuthenticated ? "Go to Dashboard" : "Join as Helper"}
          </button>
        </div>

        {/* category list  */}
        <section className="py-6">
            <div className="container mx-auto px-4">
                <div className="flex justify-center items-center overflow-x-auto gap-6 pb-2 scrollbar-hide mx-auto">
                    {localServiceCategories.map(category => (
                        <button key={category.id} className="flex flex-col items-center min-w-[100px] group transition-transform">
                            <div className={`w-12 h-12 ${category.color} rounded-2xl flex items-center justify-center mb-2 group-hover:shadow-xl transition-allduration-200`}>
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d={category.icon} />
                                </svg>
                            </div>
                            <span className="text-xs font-medium text-blue-900 text-center leading-tight">
                                {category.title}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </section>
      </div>
    </section>
  );
}

export default Hero;
