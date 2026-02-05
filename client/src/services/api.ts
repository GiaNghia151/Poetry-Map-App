import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const fetchPoems = async () => {
    try {
        const response = await axios.get(`${API_URL}/poems`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching poems');
    }
};

export const addPoem = async (poemData: any) => {
    try {
        const response = await axios.post(`${API_URL}/poems`, poemData);
        return response.data;
    } catch (error) {
        throw new Error('Error adding poem');
    }
};

export const loginUser = async (credentials: any) => {
    try {
        const response = await axios.post(`${API_URL}/auth/login`, credentials);
        return response.data;
    } catch (error) {
        throw new Error('Error logging in');
    }
};

export const registerUser = async (userData: any) => {
    try {
        const response = await axios.post(`${API_URL}/auth/register`, userData);
        return response.data;
    } catch (error) {
        throw new Error('Error registering user');
    }
};

export const fetchUserCollections = async (userId: any) => {
    try {
        const response = await axios.get(`${API_URL}/users/${userId}/collections`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching user collections');
    }
};