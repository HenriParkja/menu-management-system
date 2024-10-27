import React, { useState } from 'react';
import MenuSelector from '../molecules/MenuSelector';
import MenuActions from '../molecules/MenuActions';
import MenuTree from '../molecules/MenuTree';

function MenuList({
                      menus,
                      selectedMenu,
                      selectedMenuItemId,
                      setSelectedMenuId,
                      setSelectedMenuItemId,
                      addChildItem,
                      isLoading,
                      isMenuLoading,
                      isError
                  }) {
    const [expandedItems, setExpandedItems] = useState({});

    const toggleExpand = (id) => {
        setExpandedItems((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    // Function to recursively expand or collapse all items
    const setAllExpandedState = (items, expand) => {
        const updatedState = {};

        const recurse = (children) => {
            children.forEach((child) => {
                updatedState[child.id] = expand;
                if (child.children) {
                    recurse(child.children);
                }
            });
        };

        if (items) {
            recurse(items);
        }

        setExpandedItems(updatedState);
    };

    const expandAll = () => {
        if (selectedMenu && selectedMenu.children) {
            setAllExpandedState(selectedMenu.children, true);
        }
    };

    const collapseAll = () => {
        if (selectedMenu && selectedMenu.children) {
            setAllExpandedState(selectedMenu.children, false);
        }
    };

    if (isLoading) return <div>Loading menus...</div>;
    if (isError) return <div>Failed to load menus. Please try again later.</div>;

    return (
        <div className="w-full lg:w-1/2 bg-white p-4">
            <h1 className="text-xl font-bold mb-4">Menus</h1>
            <MenuSelector menus={menus} setSelectedMenuId={setSelectedMenuId} selectedMenuId={selectedMenu?.id} />
            <MenuActions expandAll={expandAll} collapseAll={collapseAll} />
            <MenuTree
                items={selectedMenu?.children}
                expandedItems={expandedItems}
                toggleExpand={toggleExpand}
                addChildItem={addChildItem}
                selectedMenuItemId={selectedMenuItemId}
                setSelectedMenuItemId={setSelectedMenuItemId}
            />
        </div>
    );
}

export default MenuList;
