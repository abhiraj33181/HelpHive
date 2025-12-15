import React, { useEffect, useState } from "react";
import { localServiceCategories } from "../../assets/constant";
import { useNavigate } from "react-router-dom";


const words  = [
    "Local Services, Simplified",
    "Trusted Helpers Near You",
    "Book • Chat • Get Work Done",
    "Your City. Your Helpers."
];

function Hero() {
    const [text, setText] = useState("");
    const [wordIndex, setWordIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const isAuthenticated = true;
    const nvaigate = useNavigate()


    useEffect(() => {
        const currentWord = words[wordIndex];
        let speed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            setText((prev) =>
                isDeleting
                    ? currentWord.substring(0, prev.length - 1)
                    : currentWord.substring(0, prev.length + 1)
            );

            // typing complete
            if (!isDeleting && text === currentWord) {
                setTimeout(() => setIsDeleting(true), 800);
            }

            // deleting complete
            if (isDeleting && text === "") {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        }, speed);

        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    return (
        <section className="py-20 px-4 bg-gradient-to-b from-blue-50 to-white">
            <div className="container mx-auto text-center">
                <h1 className="heading text-5xl md:text-6xl font-bold text-blue-900 leading-tight mb-6">
                    Find trusted local helpers <br />
                    <span className="heading text-blue-800">all in one place</span>
                </h1>

                <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
                    Book trusted local helpers for any task — plumbers, electricians,
                    tutors, and more. Affordable, reliable, and available anytime,
                    anywhere.
                    <span className="text-yellow-500">{text}</span>
                    <span className="animate-pulse">|</span>
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium rounded-full px-8 py-3 text-lg transition-all duration-300 shadow-md hover:shadow-lg">
                        {isAuthenticated ? "Book a Service" : "Find a Helper"}
                    </button>

                    <button className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-medium rounded-full px-8 py-3 text-lg transition-all duration-300">
                        {isAuthenticated ? "Go to Dashboard" : "Join as Helper"}
                    </button>
                </div>

                {/* Category List */}
                <div className="py-6">
                    <div className="scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-blue-100">
                        <div className="flex items-center gap-6 pb-2 px-4 w-max mx-auto">
                            {localServiceCategories.map((category) => (
                                <button
                                    onClick={() => nvaigate(`/providers/${category.title}`)}
                                    key={category.id}
                                    className="flex flex-col items-center min-w-[100px] group transition-transform hover:scale-105"
                                >
                                    <div
                                        className={`w-14 h-14 ${category.color} rounded-2xl flex items-center justify-center mb-2 group-hover:shadow-xl transition-all duration-200`}
                                    >
                                        <svg
                                            className="w-6 h-6 text-white"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
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

                </div>

                {/* Trust Indicators */}
                <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600 mt-10">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>500+ Certified Helpers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>50,000+ Satisfied Users</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>24/7 Availability</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero;
