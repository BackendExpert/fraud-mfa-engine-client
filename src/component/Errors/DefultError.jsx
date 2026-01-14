import React from "react";

const DefultError = () => {
    return (
        <div className="flex flex-col items-center justify-center text-center px-6 py-16 min-h-screen bg-gradient-to-br from-emerald-100 via-emerald-200 to-cyan-200">

            <h1 className="text-8xl sm:text-9xl font-extrabold text-emerald-600 mb-4 drop-shadow-lg">
                404
            </h1>

            <h2 className="text-2xl sm:text-3xl font-semibold tracking-wider text-emerald-700 mb-2">
                Oops! Page Not Found
            </h2>

            <p className="text-emerald-800 mb-8 max-w-md">
                The page you’re looking for doesn’t exist or may have been moved.
                Let’s get you back home safely.
            </p>

            <a href="/">
                <div className="inline-block py-3 px-10 bg-gradient-to-r from-emerald-400 to-cyan-400 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 hover:shadow-xl transition-all duration-300">
                    Go Back Home
                </div>
            </a>

        </div>
    );
};

export default DefultError;
