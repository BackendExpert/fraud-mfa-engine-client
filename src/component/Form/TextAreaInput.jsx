import React from 'react';

const TextAreaInput = ({
    label,
    name,
    rows = 4,
    value,
    onChange,
    placeholder = '',
    required = false,
}) => {
    return (
        <div className="mb-5">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-semibold text-emerald-600 mb-2"
                >
                    {label}
                </label>
            )}
            <textarea
                id={name}
                name={name}
                rows={rows}
                value={value}
                onChange={onChange}
                required={required}
                placeholder={placeholder}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 
                           placeholder-gray-400 focus:outline-none focus:border-emerald-400
                           focus:ring-2 focus:ring-emerald-300/40 transition-all duration-200 
                           hover:border-emerald-300 resize-none shadow-sm hover:shadow-md"
            />
        </div>
    );
};

export default TextAreaInput;
