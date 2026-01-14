import React from "react";

const DashError = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-20 bg-white">

            {/* Gradient Icon Circle */}
            <div className="w-28 h-28 rounded-full flex items-center justify-center shadow-lg mb-6 
                            bg-gradient-to-r from-emerald-400 to-cyan-400">
                <span className="text-white text-5xl font-bold drop-shadow-md">!</span>
            </div>

            {/* Error Code */}
            <h1 className="text-[3rem] md:text-[6rem] font-extrabold text-transparent bg-clip-text 
                           bg-gradient-to-r from-emerald-400 to-cyan-400 leading-none">
                501
            </h1>

            {/* Title */}
            <h2 className="mt-3 text-xl md:text-3xl font-semibold text-gray-800">
                Feature Not Implemented Yet
            </h2>

            {/* Description */}
            <p className="mt-3 max-w-md text-gray-600 text-sm md:text-base leading-relaxed">
                This feature is still under construction.
                We're actively working on it — check back again soon.
            </p>

            {/* Button */}
            <a href="/Dashboard" className="mt-8">
                <button className="py-3 px-12 rounded-xl font-medium text-white shadow-md 
                                   bg-gradient-to-r from-emerald-400 to-cyan-400
                                   hover:shadow-lg hover:scale-105 active:scale-95 
                                   transition-all duration-300">
                    Go Back Home
                </button>
            </a>
        </div>
    );
};

export default DashError;
