import React, { useState } from 'react';
import { faqs, trustLogos } from '../../assets/constant';

function FAQ() {
    const [openFAQ, setOpenFAQ] = useState(null);

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
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
