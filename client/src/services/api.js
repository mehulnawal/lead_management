import axios from 'axios';

const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    withCredentials: true
});

export const getStats = () => API.get('/leads/stats');
export const getAllLeads = (params) => API.get('/leads', { params });
export const getSingleLead = (id) => API.get(`/leads/${id}`);
export const addLead = (data) => API.post('/leads', data);
export const updateLead = (id, data) => API.put(`/leads/${id}`, data);
export const deleteLead = (id) => API.delete(`/leads/${id}`);