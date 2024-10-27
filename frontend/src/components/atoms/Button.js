// components/atoms/Button.js

import React from 'react';
import PlusIcon from './PlusIcon';

function Button({ onClick, children, variant = 'default', className = '' }) {
    const baseClasses = 'font-semibold transition-all inline-flex items-center justify-center';
    const variantClasses = {
        default: 'bg-gray-800 text-white px-6 py-2 rounded-full',
        primary: 'bg-blue-600 text-white px-8 py-4 rounded-full',
        secondary: 'bg-gray-100 text-gray-800 border border-gray-300 px-6 py-2 rounded-full',
        dark: 'bg-gray-900 text-white px-6 py-2 rounded-full',
        small: 'bg-blue-600 text-white h-8 w-8 rounded-full' // Small circle button
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return (
        <button onClick={onClick} className={classes}>
            {variant === "small" ? <PlusIcon size={16} /> : children}
        </button>
    );
}

export default Button;
