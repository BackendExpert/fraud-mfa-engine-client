import React, { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";

const Toast = ({ success, message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const icon = success ? (
        <FaCheckCircle className="text-white w-5 h-5" />
    ) : (
        <FaTimesCircle className="text-white w-5 h-5" />
    );

    const toastStyle = success
        ? "bg-gradient-to-r from-green-600 to-green-700 border-l-4 border-green-400"
        : "bg-gradient-to-r from-[#560606] to-[#3f0303] border-l-4 border-[#9b4b4b]";

    return (
        <div
            className={`flex items-center w-full max-w-sm p-4 mb-4 text-white rounded-xl shadow-lg transform transition-all duration-500 ease-out ${toastStyle} animate-slide-in`}
            role="alert"
        >
            {/* Icon */}
            <div className="flex items-center justify-center w-8 h-8 bg-white/20 rounded-lg mr-3">
                {icon}
            </div>

            {/* Message */}
            <div className="flex-1 text-sm font-medium">{message}</div>

            {/* Close Button */}
            <button
                onClick={onClose}
                type="button"
                className="ml-3 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-1.5 transition"
                aria-label="Close"
            >
                <FaTimes className="w-3 h-3" />
            </button>
        </div>
    );
};

export default Toast;
