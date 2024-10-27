import React from 'react';
import CaretIcon from '../atoms/CaretIcon';
import Button from '../atoms/Button';

function MenuItem({ item, expandedItems, toggleExpand, addChildItem, selectedMenuItemId, handleMenuItemSelection }) {
    const isExpanded = expandedItems[item.id];

    const handleAddChildItem = (parentId) => {
        const name = prompt("Enter a name for the new item:");
        if (name) {
            addChildItem(parentId, name);
        }
    };

    const hasChildren = item.children && item.children.length > 0;

    return (
        <li key={item.id} className="pt-3">
            <div className="flex items-center min-h-8">
                {hasChildren && (
                    <button onClick={() => toggleExpand(item.id)} className="text-blue-500 pr-4">
                        <CaretIcon className="text-gray-800" isOpen={isExpanded} />
                    </button>
                )}

                <span
                    className={`cursor-pointer text-gray-700 ${selectedMenuItemId === item.id ? 'font-bold' : ''} ${!hasChildren ? 'pl-10': ''}`}
                    onClick={() => handleMenuItemSelection(item.id)}
                >
                    {item.name}
                </span>

                {selectedMenuItemId === item.id && (
                    <div className="ml-4">
                        <Button onClick={() => handleAddChildItem(item.id)} variant="small"></Button>
                    </div>
                )}
            </div>

            {/* Render children if expanded */}
            {expandedItems[item.id] && item.children && item.children.length > 0 && (
                <ul className="pl-7">
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
