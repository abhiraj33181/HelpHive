import React, { useState } from 'react';
import { faqs } from '../../assets/constant';
import { ChevronDown, HelpCircle, MessageCircle } from 'lucide-react';

function FAQ() {
    const [openFAQ, setOpenFAQ] = useState(null);

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

            </div>
        </section>
    );
}

export default FAQ;