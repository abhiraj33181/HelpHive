import React, { useEffect, useState, useMemo } from "react";
import { localServiceCategories, localServiceCategories1 } from "../../assets/constant";
import { useNavigate } from "react-router-dom";
import { Search, CheckCircle2, ArrowRight } from "lucide-react";

const texts = [
    "trusted local helpers",
    "verified service providers",
    "book services instantly",
    "simple. fast. reliable."
];

function Hero() {
    const [text, setText] = useState("");
    const [index, setIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();

    const allCategories = useMemo(() => {
        return [...localServiceCategories, ...localServiceCategories1];
    }, []);

    useEffect(() => {
        const current = texts[index];
        const speed = isDeleting ? 40 : 80;

        const timer = setTimeout(() => {
            setText((prev) =>
                isDeleting
                    ? current.substring(0, prev.length - 1)
                    : current.substring(0, prev.length + 1)
            );

            if (!isDeleting && text === current) {
                setTimeout(() => setIsDeleting(true), 1500);
            }

            if (isDeleting && text === "") {
                setIsDeleting(false);
                setIndex((prev) => (prev + 1) % texts.length);
            }
        }, speed);

        return () => clearTimeout(timer);
    }, [text, isDeleting, index]);

    return (
        <section className="relative pt-24 pb-12 px-4 overflow-hidden bg-white mt-16 sm:mt-0">
            
            {/* Background Decor */}
            <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#dbeafe,transparent)]"></div>
            </div>

            <div className="container mx-auto text-center relative z-10">
                
                {/* Main Heading */}
                <div className="max-w-4xl mx-auto mb-8">
                    {/* FIXED: Reduced mobile font size (text-4xl) to prevent wrapping issues */}
                    <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
                        Find <span className="text-blue-600">trusted</span> local helpers <br className="hidden md:block" />
                        
                        {/* FIXED: Used min-h instead of fixed h to prevent jitter, added break-words */}
                        <span className="block mt-2 min-h-[1.2em] bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent break-words">
                            {text}
                            <span className="animate-pulse text-blue-600 inline-block align-middle ml-1">|</span>
                        </span>
                    </h1>
                    
                    <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-2">
                        Book verified professionals for any task — plumbers, electricians, tutors, and more. 
                        Affordable, reliable, and available anytime.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 sm:mb-16 w-full max-w-md mx-auto sm:max-w-none">
                    <button 
                        onClick={() => navigate('/providers')} 
                        className="group relative flex items-center justify-center gap-2 bg-blue-600 text-white font-semibold rounded-full px-8 py-3.5 text-base sm:text-lg transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 hover:-translate-y-0.5 w-full sm:w-auto"
                    >
                        Find Helper <Search className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    </button>

                    <button 
                        onClick={() => navigate('/auth/login')} 
                        className="group flex items-center justify-center gap-2 bg-white text-slate-700 border border-slate-200 font-semibold rounded-full px-8 py-3.5 text-base sm:text-lg transition-all duration-300 hover:border-blue-200 hover:bg-blue-50 w-full sm:w-auto"
                    >
                        Join as a Helper <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Categories Section */}
                <div className="relative max-w-6xl mx-auto">
                    {/* Side Fades - Hidden on small mobile to allow edge-to-edge view */}
                    <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:w-24"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:w-24"></div>

                    <div className="overflow-x-auto pb-8 pt-2 hide-scrollbar scroll-smooth">
                        <div className="flex items-start justify-start md:justify-center gap-4 sm:gap-6 px-4 sm:px-12 min-w-max">
                            {allCategories.map((category, idx) => (
                                <button
                                    onClick={() => navigate(`/providers/${category.title}`)}
                                    key={category.id || idx}
                                    className="flex flex-col items-center group w-20 sm:w-24 transition-all duration-300 hover:-translate-y-2 flex-shrink-0"
                                >
                                    <div
                                        className={`w-14 h-14 sm:w-16 sm:h-16 ${category.color || 'bg-blue-500'} rounded-2xl flex items-center justify-center mb-3 shadow-md group-hover:shadow-xl group-hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden`}
                                    >
                                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <svg
                                            className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow-sm"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d={category.icon} />
                                        </svg>
                                    </div>
                                    <span className="text-xs sm:text-sm font-semibold text-slate-700 text-center leading-tight group-hover:text-blue-600 transition-colors">
                                        {category.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Trust Indicators - Vertical on Mobile, Horizontal on Desktop */}
                <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-12 mt-4 sm:mt-8 py-6 border-t border-slate-100">
                    <TrustItem text="500+ Certified Helpers" />
                    <TrustItem text="50,000+ Satisfied Users" />
                    <TrustItem text="24/7 Support Available" />
                </div>

            </div>
        </section>
    );
}

function TrustItem({ text }) {
    return (
        <div className="flex items-center gap-2 text-slate-600 font-medium text-sm sm:text-base">
            <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-50" />
            <span>{text}</span>
        </div>
    );
}

export default Hero;