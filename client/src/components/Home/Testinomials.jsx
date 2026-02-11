import React from 'react';
import { testimonials } from '../../assets/constant';
<<<<<<< HEAD
import { Star, Quote, ArrowRight, User } from 'lucide-react';

function Testimonials() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
            
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute right-0 top-0 bg-blue-100 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
                <div className="absolute left-0 bottom-0 bg-purple-100 w-96 h-96 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                        Loved by thousands of <span className="text-blue-600">happy customers</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
                        {/* Rating Badge */}
                        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200">
                            <span className="text-2xl font-bold text-slate-800">4.8</span>
                            <div className="flex flex-col items-start">
                                <div className="flex text-amber-400 gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-current" />
                                    ))}
                                </div>
                                <span className="text-xs text-slate-500 font-medium">Based on 72k+ reviews</span>
                            </div>
                        </div>
=======

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
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e
                    </div>
                </div>

                {/* Testimonial Grid */}
<<<<<<< HEAD
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="group relative bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Decorative Quote Icon */}
                            <div className="absolute top-6 right-6 text-slate-100 group-hover:text-blue-50 transition-colors">
                                <Quote className="w-10 h-10 fill-current" />
                            </div>

                            {/* Stars */}
                            <div className="flex gap-1 text-amber-400 mb-6">
                                {[...Array(testimonial.rating || 5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>

                            {/* Text */}
                            <p className="text-slate-600 mb-8 leading-relaxed relative z-10">
                                "{testimonial.text}"
                            </p>

                            {/* Author Info */}
                            <div className="flex items-center gap-4 pt-6 border-t border-slate-50">
                                {/* Avatar (Uses image if available, else Initials) */}
                                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm shrink-0">
                                    {testimonial.image ? (
                                        <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover rounded-full" />
                                    ) : (
                                        getInitials(testimonial.author)
                                    )}
                                </div>
                                
                                <div>
                                    <h4 className="font-semibold text-slate-900 text-sm">
                                        {testimonial.author}
                                    </h4>
                                    <p className="text-slate-400 text-xs">
                                        {testimonial.location || "Verified Customer"}
                                    </p>
                                </div>
=======
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
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e
                            </div>
                        </div>
                    ))}
                </div>

<<<<<<< HEAD
                {/* Footer Action */}
                <div className="text-center mt-16">
                    <button className="inline-flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium transition-colors group">
                        Read more success stories 
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
=======
                {/* Read More Button */}
                <div className="text-center mt-10">
                    <button className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                        Read More
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e
                    </button>
                </div>
            </div>
        </section>
    );
}

<<<<<<< HEAD
// Helper to get initials from name (e.g. "John Doe" -> "JD")
const getInitials = (name) => {
    if (!name) return <User className="w-5 h-5" />;
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

export default Testimonials;
=======
export default Testimonials;
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e
