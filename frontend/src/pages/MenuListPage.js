import React, {useState} from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchMenus, fetchMenuById, addMenuItem, updateMenuItem, deleteMenuItem} from '../services/menuAPI';
import MenuItem from '../components/molecules/MenuItem';
import MenuItemDetails from '../components/molecules/MenuItemDetails';
import Button from '../components/atoms/Button';
import MenuList from '../components/organisms/MenuList';

function MenuListPage() {
    const queryClient = useQueryClient(); // Get the query client instance

    // Fetch all menus using React Query (lightweight version with just IDs and names)
    const {data: menus, isLoading, isError} = useQuery({
        queryKey: ['menus'],
        queryFn: fetchMenus,
    });

    const addChildMutation = useMutation({
        mutationFn: addMenuItem,
        onSuccess: () => {
            queryClient.invalidateQueries(['menus']); // Refresh the menus data
        },
    });

    const updateMenuItemMutation = useMutation({
        mutationFn: updateMenuItem,
        onSuccess: () => {
            queryClient.invalidateQueries(['menu', selectedMenuId]);
        },
    });

    const deleteMenuItemMutation = useMutation({
        mutationFn: deleteMenuItem,
        onSuccess: () => {
            queryClient.invalidateQueries(['menu', selectedMenuId]);
            setSelectedMenuItemId(null); // Deselect the item after deletion
        },
    });

    // State for selected menu
    const [selectedMenuId, setSelectedMenuId] = useState(null);
    const [selectedMenuItemId, setSelectedMenuItemId] = useState(null);
    const [expandedItems, setExpandedItems] = useState({});

    // Fetch selected menu by ID only when a menu is selected
    const {data: selectedMenu, isLoading: isMenuLoading, isError: isMenuError} = useQuery({
        queryKey: ['menu', selectedMenuId],
        queryFn: () => fetchMenuById(selectedMenuId),
        enabled: !!selectedMenuId, // Only run query when selectedMenuId is set
    });

    const toggleExpand = (id) => {
        setExpandedItems((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    // Recursive function to expand or collapse all items in the tree
    const expandOrCollapseAll = (item, expand) => {
        setExpandedItems((prevState) => ({
            ...prevState,
            [item.id]: expand,
        }));

        if (item.children && item.children.length > 0) {
            item.children.forEach((child) => expandOrCollapseAll(child, expand));
        }
    };

    // Recursive function to render menu items and items
    const renderMenuItem = (item) => (
        <li key={item.id} className="ml-4">
            <div className="flex items-center">
                <Button onClick={() => toggleExpand(item.id)} className="text-blue-500">
                    {expandedItems[item.id] ? '-' : '+'}
                </Button>
                <span className="ml-2 cursor-pointer text-gray-700">{item.name}</span>
            </div>
            {expandedItems[item.id] && item.children && item.children.length > 0 && (
                <ul className="ml-4">
                    {item.children.map((child) => renderMenuItem(child))}
                </ul>
            )}
        </li>
    );

    const addChildItem = (parentId, name) => {
        const newItem = {
            name: name || 'New Item',
            parent_id: parentId,
            menu_id: selectedMenu.id,
        };

        // Call the mutation to add the item
        addChildMutation.mutate(newItem);
    };

    const findSelectedMenuItem = (items) => {
        if (!items) return null;
        for (const item of items) {
            if (item.id === selectedMenuItemId) return item;
            if (item.children) {
                const found = findSelectedMenuItem(item.children);
                if (found) return found;
            }
        }
        return null;
    };

    const selectedMenuItem = selectedMenu && findSelectedMenuItem(selectedMenu.children);

    const saveMenuItem = ({id, name, parentName}) => {
        const updatedItem = {name, parentName}; // Construct updated item data

        updateMenuItemMutation.mutate({
            id: id,
            menuItemData: updatedItem
        });
    };

    const handleDeleteMenuItem = (itemId) => {
        deleteMenuItemMutation.mutate(itemId);
    };

    return (
        <div className="flex flex-wrap">
            <MenuList
                menus={menus}
                selectedMenu={selectedMenu}
                selectedMenuItemId={selectedMenuItemId}
                setSelectedMenuId={setSelectedMenuId}
                setSelectedMenuItemId={setSelectedMenuItemId}
                addChildItem={addChildItem}
                isLoading={isLoading}
                isMenuLoading={isMenuLoading}
                isError={isError || isMenuError}
            />
            <div className="w-full lg:w-1/2 p-6">
                <MenuItemDetails item={selectedMenuItem} saveMenuItem={saveMenuItem} deleteMenuItem={handleDeleteMenuItem}/>
            </div>
        </div>
    );
}

export default MenuListPage;
