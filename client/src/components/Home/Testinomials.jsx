import React from 'react';
import { testimonials } from '../../assets/constant';

function Testimonials() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-12">
                    <h2 className="heading text-3xl font-bold text-blue-900 mb-4">
                        Our Customers Love Us
                    </h2>

                    <div className="flex items-center justify-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-blue-900">4.8</span>
                        <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-gray-500 text-sm">72k+ reviews</span>
                    </div>
                </div>

                {/* Testimonial Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`${testimonial.bgColor} border border-gray-200 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                        >
                            {/* Stars */}
                            <div className="flex mb-4 text-yellow-400">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                    </svg>
                                ))}
                            </div>

                            {/* Testimonial Text */}
                            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
                                {testimonial.text}
                            </p>

                            {/* Author */}
                            <div>
                                <p className="font-semibold text-blue-900">{testimonial.author}</p>
                                <p className="text-gray-500 text-sm">{testimonial.location}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Read More Button */}
                <div className="text-center mt-10">
                    <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                        Read More
                    </button>
                </div>
            </div>
        </section>
    );
}

export default Testimonials;
