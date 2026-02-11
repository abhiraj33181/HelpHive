import React, { useState } from 'react';
<<<<<<< HEAD
import { faqs } from '../../assets/constant';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';
=======
import { faqs, trustLogos } from '../../assets/constant';
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e

function FAQ() {
    const [openFAQ, setOpenFAQ] = useState(null);

<<<<<<< HEAD
    const toggleFAQ = (index) => {
        setOpenFAQ(openFAQ === index ? null : index);
    };

    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
            <div className="max-w-3xl mx-auto">
                
                {/* Header */}
                <div className="text-center mb-16">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-semibold uppercase tracking-wide mb-4">
                        <HelpCircle className="w-4 h-4" /> Support
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-slate-500 text-lg">
                        Everything you need to know about our services and how we help.
                    </p>
                </div>

                {/* FAQ List */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => {
                        const isOpen = openFAQ === index;

                        return (
                            <div
                                key={index}
                                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                                    isOpen 
                                    ? 'border-blue-500 shadow-lg shadow-blue-500/10' 
                                    : 'border-slate-200 hover:border-blue-300'
                                }`}
                            >
                                <button
                                    onClick={() => toggleFAQ(index)}
                                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                                >
                                    <span className={`text-base md:text-lg font-semibold transition-colors ${
                                        isOpen ? 'text-blue-700' : 'text-slate-800'
                                    }`}>
                                        {faq.question}
                                    </span>
                                    <span className={`p-2 rounded-full bg-slate-50 transition-all duration-300 ${isOpen ? 'bg-blue-50 rotate-180' : ''}`}>
                                        <ChevronDown className={`w-5 h-5 transition-colors ${isOpen ? 'text-blue-600' : 'text-slate-400'}`} />
                                    </span>
                                </button>

                                {/* Smooth Accordion Animation using Grid Rows */}
                                <div 
                                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                                        isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="px-6 pb-6 pt-0">
                                            <p className="text-slate-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Contact CTA */}
                <div className="mt-16 text-center bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="inline-block p-3 bg-blue-100 rounded-full text-blue-600 mb-4">
                        <MessageCircle className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">Still have questions?</h3>
                    <p className="text-slate-500 mb-6 max-w-md mx-auto">
                        Can't find the answer you're looking for? Please chat to our friendly team.
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg">
                        Get in Touch
                    </button>
                </div>

=======
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
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e
            </div>
        </section>
    );
}

<<<<<<< HEAD
export default FAQ;
=======
export default FAQ;
>>>>>>> ad8a7309a6429a315a675c843406e9e3e412259e
