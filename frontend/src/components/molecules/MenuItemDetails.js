import React, { useState, useEffect } from 'react';

function MenuItemDetails({ item, saveMenuItem }) {
    // Local state for editable fields
    const [name, setName] = useState(item?.name || '');
    const [parentName, setParentName] = useState(item?.parentName || '');

    // Synchronize local state when the selected item changes
    useEffect(() => {
        setName(item?.name || '');
        setParentName(item?.parentName || '');
    }, [item]);

    // Handle saving the updated item
    const handleSave = () => {
        if (item && item.id) {
            saveMenuItem({
                id: item.id,
                name,
                parentName,
            });
        }
    };

    if (!item) {
        return <p>Select a menu item to view details.</p>;
    }

    return (
        <div className="w-full lg:w-1/2 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-4">Menu Item Details</h2>

            <div className="mb-4">
                <label className="block text-gray-600">Menu ID</label>
                <input
                    type="text"
                    value={item.id}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-600">Depth</label>
                <input
                    type="text"
                    value={item.depth}
                    readOnly
                    className="w-full p-2 border rounded bg-gray-100"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-600">Parent Data</label>
                <input
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>

            <div className="mb-4">
                <label className="block text-gray-600">Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>

            <button
                onClick={handleSave}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Save
            </button>
        </div>
    );
}

export default MenuItemDetails;
