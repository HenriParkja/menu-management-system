import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchMenus, fetchMenuById } from '../services/menuAPI';

function MenuList() {
    // Fetch all menus using React Query (lightweight version with just IDs and names)
    const { data: menus, isLoading, isError } = useQuery({
        queryKey: ['menus'],
        queryFn: fetchMenus,
    });

    // State for selected menu
    const [selectedMenuId, setSelectedMenuId] = useState(null);

    // Fetch selected menu by ID only when a menu is selected
    const { data: selectedMenu, isLoading: isMenuLoading, isError: isMenuError } = useQuery({
        queryKey: ['menu', selectedMenuId],
        queryFn: () => fetchMenuById(selectedMenuId),
        enabled: !!selectedMenuId, // Only run query when selectedMenuId is set
    });
    
    // State for expanded items within the selected menu
    const [expandedItems, setExpandedItems] = useState({});

    // Toggle expand/collapse state for each item
    const toggleExpand = (id) => {
        setExpandedItems((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    // Expand all items in the selected menu
    const expandAll = () => {
        if (!selectedMenu) return;
        expandOrCollapseAll(selectedMenu, true);
    };

    // Collapse all items in the selected menu
    const collapseAll = () => {
        if (!selectedMenu) return;
        expandOrCollapseAll(selectedMenu, false);
    };

    // Recursive function to expand or collapse all items in the tree
    const expandOrCollapseAll = (item, expand) => {
        setExpandedItems((prevState) => ({
            ...prevState,
            [item.id]: expand,
        }));

        if (item.items && item.items.length > 0) {
            item.items.forEach((child) => expandOrCollapseAll(child, expand));
        }
    };

    // Recursive function to render menu items and items
    const renderMenuItem = (item) => (
        <li key={item.id} className="ml-4">
            <div className="flex items-center">
                <button onClick={() => toggleExpand(item.id)} className="text-blue-500">
                    {expandedItems[item.id] ? '-' : '+'}
                </button>
                <span className="ml-2 cursor-pointer text-gray-700">{item.name}</span>
            </div>
            {expandedItems[item.id] && item.items && item.items.length > 0 && (
                <ul className="ml-4">
                    {item.items.map((child) => renderMenuItem(child))}
                </ul>
            )}
        </li>
    );

    // Handle menu selection from dropdown
    const handleMenuSelection = (event) => {
        const menuId = event.target.value;
        setSelectedMenuId(menuId); // Set the selected menu ID
        setExpandedItems({}); // Reset expanded items when changing menus
    };

    // Conditional rendering based on loading and error states
    if (isLoading) return <div>Loading menus...</div>;
    if (isError) return <div>Failed to load menus. Please try again later.</div>;

    return (
        <div className="flex flex-wrap">
            {/* Sidebar for menu items */}
            <div className="w-full lg:w-1/2 bg-gray-100 p-4">
                <h1 className="text-xl font-bold mb-4">Menus</h1>

                {/* Dropdown for selecting a menu */}
                <select
                    className="w-full mb-4 p-2 border rounded"
                    onChange={handleMenuSelection}
                    value={selectedMenuId || ""}
                >
                    <option value="" disabled>
                        Select a menu to edit
                    </option>
                    {menus.map((menu) => (
                        <option key={menu.id} value={menu.id}>
                            {menu.name}
                        </option>
                    ))}
                </select>
                <div className="flex mb-4">
                    <button onClick={expandAll} className="mr-2 bg-gray-300 px-2 py-1 rounded">
                        Expand All
                    </button>
                    <button onClick={collapseAll} className="bg-gray-300 px-2 py-1 rounded">
                        Collapse All
                    </button>
                </div>

                {/* Render selected menu's items */}
                {isMenuLoading ? (
                    <p>Loading menu details...</p>
                ) : isMenuError ? (
                    <p>Failed to load menu details. Please try again later.</p>
                ) : selectedMenu ? (
                    <ul>{renderMenuItem(selectedMenu)}</ul>
                ) : (
                    <p>Select a menu to view items.</p>
                )}
            </div>

            {/* Sidebar for selected item details */}
            <div className="w-full lg:w-1/2 p-6">
                {selectedMenu ? (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Menu Details</h2>
                        <p><strong>Menu ID:</strong> {selectedMenuId}</p>
                        <p><strong>Selected Menu Name:</strong> {selectedMenu.name}</p>
                        {/* Add more details here as needed */}
                    </div>
                ) : (
                    <p>Select a menu item to view details.</p>
                )}
            </div>
        </div>
    );
}

export default MenuList;
