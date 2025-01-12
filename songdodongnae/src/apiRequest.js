// src/api.js
import axios from 'axios';
import urls from './config/apiUrls.json'

const API_URL = urls['base-url']; // 사용할 API의 기본 URL

// GET 요청을 위한 함수
export const fetchData = async (endpoint) => {
    try {
        const response = await axios.get(`${API_URL}${endpoint}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

// POST 요청을 위한 함수
export const postData = async (endpoint, data) => {
    try {
        const response = await axios.post(`${API_URL}${endpoint}`, data);
        return response.data;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
};
