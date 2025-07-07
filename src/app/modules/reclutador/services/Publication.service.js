import axios from 'axios';

const API_URL = 'https://app-250706133042.azurewebsites.net/api/joboffers'; // Ajustado al backend real

export const getAllPublications = (employerId) => {
    const token = localStorage.getItem('token');
    return axios.get(`${API_URL}?employer_id=${employerId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};


//listo
export const addPublication = (publication) => {
    const token = localStorage.getItem('token');
    return axios.post(API_URL, publication, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const updatePublication = (id, publication) => {
    const token = localStorage.getItem('token');
    return axios.put(`${API_URL}/${id}`, publication, {
        headers: { Authorization: `Bearer ${token}` }
    });
};

export const deletePublication = (id) => {
    const token = localStorage.getItem('token');
    return axios.delete(`${API_URL}/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
};