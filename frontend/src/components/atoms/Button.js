// components/atoms/Button.js

import React from 'react';

function Button({ onClick, children, variant = 'default', className = '' }) {
    const baseClasses = 'px-6 py-2 font-semibold rounded-full transition-all';
    const variantClasses = {
        default: 'bg-gray-800 text-white',
        primary: 'bg-blue-600 text-white px-8 py-4',
        secondary: 'bg-gray-100 text-gray-800 border border-gray-300',
        dark: 'bg-gray-900 text-white',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

    return (
        <button onClick={onClick} className={classes}>
            {children}
        </button>
    );
}

export default Button;
