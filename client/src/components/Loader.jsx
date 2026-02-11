import React from "react";

const Loader = () => {
    return (
        <div className="w-screen h-screen flex flex-col gap-6 justify-center items-center bg-gradient-to-br from-blue-600 to-blue-900 text-white">

            {/* Logo Inside Circle Animation */}
            <div className="relative">
                <div className="w-20 h-20 rounded-full border-4 border-white/30 border-t-white animate-spin"></div>
                <div className="absolute inset-0 flex justify-center items-center">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M12 2L15 8H9L12 2Z"
                            fill="white"
                            className="drop-shadow-md"
                        />
                        <path
                            d="M12 22L9 16H15L12 22Z"
                            fill="white"
                        />
                        <circle cx="12" cy="12" r="3" fill="white" />
                    </svg>
                </div>
            </div>

            {/* App Title */}
            <h2 className="text-2xl font-bold tracking-wide animate-pulse">
                HelpHive
            </h2>

            {/* Text Animation */}
            <p className="text-sm tracking-wide opacity-80 animate-bounce">
                Connecting you to trusted helpers...
            </p>
        </div>
    );
};

export default Loader;
