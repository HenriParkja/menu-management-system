import React from 'react';
import Button from '../atoms/Button';

function MenuActions({ expandAll, collapseAll }) {
    return (
        <div className="flex mb-4 gap-4">
            <Button onClick={expandAll} variant="dark">Expand All</Button>
            <Button onClick={collapseAll} variant="secondary">Collapse All</Button>
        </div>
    );
}

export default MenuActions;
