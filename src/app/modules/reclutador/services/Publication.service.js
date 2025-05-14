

import axios from 'axios';

const endpoint = '/api/publications';

export const getAllPublications = () => axios.get(endpoint);

export const getPublicationById = (id) => axios.get(`${endpoint}/${id}`);

export const addPublication = (publication) => axios.post(endpoint, publication);

export const updatePublication = (id, publication) => axios.put(`${endpoint}/${id}`, publication);

export const deletePublication = (id) => axios.delete(`${endpoint}/${id}`);


