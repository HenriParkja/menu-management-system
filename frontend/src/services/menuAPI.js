import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Fetch all menus
export const fetchMenus = async () => {
    const response = await axios.get(`${API_URL}/menus`);
    return response.data;
};

// Fetch a specific menu by ID (with hierarchical items)
export const fetchMenuById = async (id) => {
    const response = await axios.get(`${API_URL}/menus/${id}`);
    return response.data;
};

// Add a new menu
export const createMenu = async (menuData) => {
    const response = await axios.post(`${API_URL}/menus`, menuData);
    return response.data;
};

// Add a new menu item under a specific menu
export const addMenuItem = async (menuItemData) => {
    const response = await axios.post(`${API_URL}/menu-items`, menuItemData);
    return response.data;
};

// Update an existing menu item
export const updateMenuItem = async ({ id, menuItemData }) => {
    const response = await axios.put(`${API_URL}/menu-items/${id}`, menuItemData);
    return response.data;
};

// Delete a menu item
export const deleteMenuItem = async (id) => {
    const response = await axios.delete(`${API_URL}/menu-items/${id}`);
    return response.data;
};
