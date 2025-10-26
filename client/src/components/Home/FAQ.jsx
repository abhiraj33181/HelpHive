import React, { useState } from 'react';
import { faqs, trustLogos } from '../../assets/constant';

function FAQ() {
    const [openFAQ, setOpenFAQ] = useState(null);

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Trusted logos */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-blue-900 mb-12 heading">Trusted by millions since 2010</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center">
                        {trustLogos.map((logo, index) => (
                            <div
                                key={index}
                                className="flex items-center justify-center h-16 opacity-60 hover:opacity-100 transition-opacity duration-300"
                            >
                                <img
                                    src={logo}
                                    alt={`logo-${index}`}
                                    className="h-10 w-auto max-w-[120px] object-contain"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* FAQ Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="heading text-3xl font-bold text-blue-900 text-center mb-12">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white border border-gray-200 rounded-xl shadow-sm"
                            >
                                <button
                                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                                    className="w-full px-6 py-4 text-left flex items-center justify-between text-lg font-medium text-blue-900 hover:bg-gray-100 transition-colors duration-200 rounded-xl"
                                >
                                    <span>{faq.question}</span>
                                    <svg
                                        className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${openFAQ === index ? 'rotate-180' : ''
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {openFAQ === index && (
                                    <div className="px-6 pb-4 pt-2 text-gray-700 transition-all duration-300">
                                        <p className="leading-relaxed">{faq.answer}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default FAQ;
