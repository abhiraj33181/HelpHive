import React from 'react'
import { HandHelpingIcon } from 'lucide-react'
import { contactInfo, footerSections, socials } from '../assets/constant'

function Footer() {
    return (
        <footer className="bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section */}
                <div className="py-16 border-b border-blue-700/40">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        {/* Brand & Contact */}
                        <div className="lg:col-span-4">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md">
                                    <HandHelpingIcon className="w-7 h-7 text-white" />
                                </div>
                                <h2 className="heading text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                                    HelpHive
                                </h2>
                            </div>

                            <p className="text-blue-100/90 mb-6 leading-relaxed text-base">
                                Your trusted local helper for every need — anytime, anywhere. Reliable, fast, and just a click away.
                            </p>

                            <div className="space-y-3">
                                {contactInfo.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-blue-100">
                                        <item.icon className="w-5 h-5 text-blue-300" />
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer Links */}
                        <div className="lg:col-span-8">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
                                {footerSections.map((section, index) => (
                                    <div key={index}>
                                        <h3 className="font-semibold text-white mb-4 text-lg">
                                            {section.title}
                                        </h3>
                                        <ul className="space-y-3">
                                            {section.links.map((link, linkIndex) => (
                                                <li key={linkIndex}>
                                                    <a
                                                        href={link.href}
                                                        className="text-blue-200/80 hover:text-white transition duration-200 text-sm hover:underline"
                                                    >
                                                        {link.text}
                                                    </a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Newsletter Section */}
                <div className="py-10 border-b border-blue-700/40">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="font-semibold text-white mb-2 text-lg">
                                Stay Updated
                            </h4>
                            <p className="text-blue-200/80 text-sm">
                                Get exclusive offers and updates directly in your inbox.
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-4 py-2 rounded-lg bg-blue-800/50 border border-blue-600 text-white placeholder:text-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-[280px]"
                            />
                            <button className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg whitespace-nowrap transition">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
                    <p className="text-blue-200/80">
                        © 2025 HelpHive. All Rights Reserved.
                    </p>

                    <div className="flex items-center gap-4">
                        <span className="text-blue-200/80">Follow Us:</span>
                        <div className="flex gap-3">
                            {socials.map(({ name, icon: Icon, url }) => (
                                <a
                                    key={name}
                                    href={url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-blue-700/60 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
                                    aria-label={`Follow us on ${name}`}
                                >
                                    <Icon className="w-4 h-4 text-white" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
