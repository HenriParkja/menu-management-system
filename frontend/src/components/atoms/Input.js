// components/atoms/Input.js

import React from 'react';

function Input({ id, label, value, onChange, readOnly = false, placeholder = '', className = '', type = 'text' }) {
    const baseClasses = 'w-full p-4 rounded-lg';
    const variantClasses = readOnly ? 'bg-gray-200 text-gray-600' : 'bg-gray-100 text-gray-800';

    // Generate a unique ID if one isn’t provided
    const inputId = id || `input-${label?.toLowerCase().replace(/ /g, '-')}`;

    return (
        <div className={`mb-4 ${className}`}>
            {label && (
                <label htmlFor={inputId} className="block text-gray-600 mb-1">
                    {label}
                </label>
            )}
            <input
                id={inputId}
                type={type}
                value={value}
                onChange={onChange}
                readOnly={readOnly}
                placeholder={placeholder}
                className={`${baseClasses} ${variantClasses}`}
            />
        </div>
    );
}

export default Input;
