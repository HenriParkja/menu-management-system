import React, { useState, useEffect } from 'react';
import Button from '../atoms/Button';
import Input from '../atoms/Input';

function MenuItemDetails({ item, saveMenuItem, deleteMenuItem }) {
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

    // Handle deleting the item
    const handleDelete = () => {
        if (item && item.id) {
            if (window.confirm("Are you sure you want to delete this item?")) {
                deleteMenuItem(item.id);
            }
        }
    };

    if (!item) {
        return <p>Select a menu item to view details.</p>;
    }

    return (
        <div className="mt-8">
            <div className="mb-4">
                <Input
                    label="Menu ID"
                    type="text"
                    value={item.id}
                    readOnly={true}
                    className="w-full"
                />
            </div>

            <div className="mb-4 w-full lg:w-1/2">
                <Input
                    label="Depth"
                    type="text"
                    value={item.depth}
                    readOnly={true}
                    className="w-full"
                />
            </div>

            <div className="mb-4 w-full lg:w-1/2">
                <Input
                    label="Parent Data"
                    type="text"
                    value={parentName}
                    onChange={(e) => setParentName(e.target.value)}
                    className="w-full"
                />
            </div>

            <div className="mb-4 w-full lg:w-1/2">
                <Input
                    label="Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full"
                />
            </div>

            <div className="flex gap-4">
                <Button
                    onClick={handleSave}
                    variant="primary"
                    className="w-full lg:w-1/2"
                >
                    Save
                </Button>
                <Button
                    onClick={handleDelete}
                    variant="secondary"
                    className="w-full lg:w-1/2"
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default MenuItemDetails;
