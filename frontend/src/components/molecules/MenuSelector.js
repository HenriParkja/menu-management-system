import React from 'react';
import Select from '../atoms/Select';

function MenuSelector({ menus, selectedMenuId, setSelectedMenuId }) {
    const options = menus.map((menu) => ({
        value: menu.id,
        label: menu.name,
    }));

    return (
        <Select
            options={options}
            selectedValue={selectedMenuId}
            onChange={setSelectedMenuId}
            placeholder="Select a menu to edit"
        />
    );
}

export default MenuSelector;
