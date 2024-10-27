import React from 'react';

function MenuItem({ item, expandedItems, toggleExpand, addChildItem, selectedMenuItemId, handleMenuItemSelection }) {

    const handleAddChildItem = (parentId) => {
        const name = prompt("Enter a name for the new item:");
        if (name) {
            addChildItem(parentId, name);
        }
    };

    return (
        <li key={item.id} className="pt-3">
            <div className="flex items-center">
                {item.children && item.children.length > 0 && (
                    <button onClick={() => toggleExpand(item.id)} className="text-blue-500 mr-2">
                        {expandedItems[item.id] ? '-' : '+'}
                    </button>
                )}

                <span
                    className={`ml-2 cursor-pointer text-gray-700 ${selectedMenuItemId === item.id ? 'font-bold' : ''}`}
                    onClick={() => handleMenuItemSelection(item.id)}
                >
                    {item.name}
                </span>

                {selectedMenuItemId === item.id && (
                    <div className="ml-4">
                        <button onClick={() => handleAddChildItem(item.id)} className="text-green-500 mx-2">+</button>
                    </div>
                )}
            </div>

            {/* Render children if expanded */}
            {expandedItems[item.id] && item.children && item.children.length > 0 && (
                <ul className="pl-6">
                    {item.children.map((child) => (
                        <MenuItem
                            key={child.id}
                            item={child}
                            expandedItems={expandedItems}
                            toggleExpand={toggleExpand}
                            addChildItem={addChildItem}
                            selectedMenuItemId={selectedMenuItemId}
                            handleMenuItemSelection={handleMenuItemSelection}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default MenuItem;
