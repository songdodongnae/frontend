// src/api.js
import axios from 'axios';

// GET 요청을 위한 함수
export const fetchData = async (url, endpoint) => {
    const API_URL = url;
    try {
        const response = await axios.get(`${API_URL}${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// POST 요청을 위한 함수
export const postData = async (url, endpoint, data) => {
    const API_URL = url;
    try {
        const response = await axios.post(`${API_URL}${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};
