import axios from 'axios';

// FIX - Issue17
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL

if (!API_URL) {
    console.error('NEXT_PUBLIC_BACKEND_URL is not defined in environment variables. Falling back to localhost.');
}

const API = axios.create({
    baseURL: API_URL || 'http://localhost:8000/api/v1',
    withCredentials: true
});

export const getStats = () => API.get('/leads/stats');
export const getAllLeads = (params) => API.get('/leads', { params });
export const getSingleLead = (id) => API.get(`/leads/${id}`);
export const addLead = (data) => API.post('/leads', data);
export const updateLead = (id, data) => API.put(`/leads/${id}`, data);
export const deleteLead = (id) => API.delete(`/leads/${id}`);