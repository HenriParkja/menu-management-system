// components/atoms/PlusIcon.js

import React from 'react';

function PlusIcon({ size = 24, color = "white", className = "" }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={color}
            width={size}
            height={size}
            className={className}
        >
            <path
                fillRule="evenodd"
                d="M12 4.75a.75.75 0 01.75.75v6h6a.75.75 0 010 1.5h-6v6a.75.75 0 01-1.5 0v-6h-6a.75.75 0 010-1.5h6v-6A.75.75 0 0112 4.75z"
                clipRule="evenodd"
            />
        </svg>
    );
}

export default PlusIcon;
