import React from 'react';

const DefaultButton = ({
    label = "Click the Button",
    onClick,
    type = "button",
    disabled = false,
}) => {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`w-full py-3 px-8 rounded-xl font-semibold text-white
                        transition-all duration-200 shadow-md hover:shadow-lg
                        ${disabled
                            ? 'bg-gray-400 cursor-not-allowed'
                            : `bg-gradient-to-r from-emerald-400 to-cyan-400 
                               hover:from-emerald-500 hover:to-cyan-500
                               focus:outline-none focus:ring-2 focus:ring-emerald-300/40'}
                        transform hover:-translate-y-0.5`}
        `}>
            {label}
        </button>
    );
};

export default DefaultButton;
