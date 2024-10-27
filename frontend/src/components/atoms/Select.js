import React, {useState} from 'react';
import CaretIcon from './CaretIcon';

function Select({options, selectedValue, onChange, placeholder = 'Select an option'}) {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => setIsOpen(!isOpen);
    const handleOptionSelect = (value) => {
        onChange(value);
        setIsOpen(false);
    };

    return (
        <div className="relative w-full mb-4">
            {/* Selected item display */}
            <button
                onClick={handleToggle}
                className="w-full text-left p-2 bg-gray-100 rounded-lg flex items-center justify-between"
            >
                <span className="text-gray-800">
                    {options.find(option => option.value === selectedValue)?.label || placeholder}
                </span>
                <CaretIcon isOpen={isOpen} className="text-gray-800" />
            </button>

            {/* Options list */}
            {isOpen && (
                <div className="absolute w-full mt-2 bg-white border rounded-lg shadow-lg z-10">
                    {options.map((option) => (
                        <div
                            key={option.value}
                            onClick={() => handleOptionSelect(option.value)}
                            className={`p-2 cursor-pointer hover:bg-gray-200 ${option.value === selectedValue ? 'bg-gray-100' : ''}`}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Select;
