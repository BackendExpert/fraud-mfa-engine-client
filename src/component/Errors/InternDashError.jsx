import React from 'react';

const InternDashError = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-16 bg-gray-50">
            {/* Error Code */}
            <h1 className="text-[2rem] md:text-[10rem] font-extrabold text-blue-600 animate-bounce drop-shadow-lg">
                501
            </h1>

            {/* Title */}
            <h2 className="mt-4 text-2xl md:text-3xl font-semibold tracking-wide text-blue-700">
                Oops! Feature Not Implemented
            </h2>

            {/* Description */}
            <p className="mt-3 max-w-md text-gray-600 text-sm md:text-base">
                This feature or page hasn’t been built yet.
                Our team is working on it, so please check back later.
            </p>

            {/* Action Button */}
            <a href="/my-account" className="mt-8">
                <button className="py-3 px-10 bg-blue-600 text-white font-medium rounded-full shadow-lg hover:bg-blue-700 hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300">
                    Go Back Home
                </button>
            </a>
        </div>
    );
};

export default InternDashError;
