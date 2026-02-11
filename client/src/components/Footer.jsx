import React from 'react';
import { HandHelpingIcon, Send } from 'lucide-react';
import { contactInfo, footerSections, socials } from '../assets/constant';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="bg-slate-950 text-slate-300 relative overflow-hidden">
            
            {/* Background Decoration (Subtle Grid) */}
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]"></div>
            </div>

            {/* Top Gradient Border */}
            <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-800"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                
                {/* --- Top Section: Links & Brand --- */}
                <div className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 border-b border-slate-800">
                    
                    {/* Brand Column (Span 4) */}
                    <div className="lg:col-span-4 space-y-6">
                        <Link to="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform">
                                <HandHelpingIcon className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">HelpHive</span>
                        </Link>

                        <p className="text-slate-400 leading-relaxed max-w-sm">
                            Your trusted local helper for every need. reliable, fast, and verified professionals just a click away.
                        </p>

                        <div className="space-y-4 pt-2">
                            {contactInfo.map((item, i) => (
                                <div key={i} className="flex items-start gap-3 text-sm text-slate-400">
                                    <item.icon className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <span>{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Links Columns (Span 8) */}
                    <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
                        {footerSections.map((section, index) => (
                            <div key={index}>
                                <h3 className="text-white font-semibold text-lg mb-5 relative inline-block">
                                    {section.title}
                                    {/* Small underline decoration */}
                                    <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-blue-600 rounded-full"></span>
                                </h3>
                                <ul className="space-y-3">
                                    {section.links.map((link, linkIndex) => (
                                        <li key={linkIndex}>
                                            <Link
                                                to={link.href} // Changed to 'to' for React Router
                                                className="text-slate-400 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block text-sm"
                                            >
                                                {link.text}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- Middle Section: Newsletter --- */}
                <div className="py-10 border-b border-slate-800">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-center md:text-left">
                            <h4 className="text-xl font-bold text-white mb-2">Subscribe to our newsletter</h4>
                            <p className="text-slate-400 text-sm">Get the latest updates, offers and community news.</p>
                        </div>

                        {/* Modern Pill-Shaped Input */}
                        <form className="relative w-full max-w-md group" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                className="w-full bg-slate-900 text-white pl-6 pr-36 py-4 rounded-full border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all placeholder:text-slate-600"
                            />
                            <button className="absolute right-1.5 top-1.5 bottom-1.5 bg-blue-600 hover:bg-blue-500 text-white px-6 rounded-full font-medium transition-colors flex items-center gap-2">
                                Subscribe <Send className="w-3.5 h-3.5" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* --- Bottom Section: Copyright & Socials --- */}
                <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
                    <p>
                        &copy; {new Date().getFullYear()} HelpHive Inc. All rights reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        {socials.map(({ name, icon: Icon, url }) => (
                            <a
                                key={name}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                                aria-label={name}
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;