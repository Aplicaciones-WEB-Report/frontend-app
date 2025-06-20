import axios from 'axios';

const API_URL = 'http://localhost:3000';

const jobOffersEndpoint = `${API_URL}/job_offers`;
const applicationsEndpoint = `${API_URL}/applications`;

export const getAllPublications = () => {
    return Promise.all([
        axios.get(jobOffersEndpoint),
        axios.get(applicationsEndpoint)
    ]);
};


export const getPublicationById = (id) => axios.get(`${jobOffersEndpoint}/${id}`);


export const addPublication = (publication) => axios.post(jobOffersEndpoint, publication);


export const updatePublication = (id, publication) => axios.put(`${jobOffersEndpoint}/${id}`, publication);


export const deletePublication = (id) => axios.delete(`${jobOffersEndpoint}/${id}`);
