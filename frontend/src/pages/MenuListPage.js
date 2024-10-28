import React, {useState} from 'react';
import {useQuery, useMutation, useQueryClient} from '@tanstack/react-query';
import {fetchMenus, fetchMenuById, addMenuItem, updateMenuItem, deleteMenuItem} from '../services/menuAPI';
import MenuItemDetails from '../components/molecules/MenuItemDetails';
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

    // Fetch selected menu by ID only when a menu is selected
    const {data: selectedMenu, isLoading: isMenuLoading, isError: isMenuError} = useQuery({
        queryKey: ['menu', selectedMenuId],
        queryFn: () => fetchMenuById(selectedMenuId),
        enabled: !!selectedMenuId, // Only run query when selectedMenuId is set
    });

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
