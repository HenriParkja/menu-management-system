import React from 'react';
import MenuItem from './MenuItem';

function MenuTree({ items, expandedItems, toggleExpand, addChildItem, selectedMenuItemId, setSelectedMenuItemId }) {
    if (!items) return null;

    return (
        <ul>
            {items.map((item) => (
                <MenuItem
                    key={item.id}
                    item={item}
                    expandedItems={expandedItems}
                    toggleExpand={toggleExpand}
                    addChildItem={addChildItem}
                    selectedMenuItemId={selectedMenuItemId}
                    handleMenuItemSelection={setSelectedMenuItemId}
                />
            ))}
        </ul>
    );
}

export default MenuTree;
