import axios from 'axios';

const API_URL = 'http://localhost:3000';
const jobOffersEndpoint = `${API_URL}/job_offers`;
const applicationsEndpoint = `${API_URL}/applications`;

// Modificado para aceptar el ID del reclutador
export const getAllPublications = (employerId) => {
    // Pide solo las ofertas del reclutador que ha iniciado sesión
    return Promise.all([
        axios.get(`${jobOffersEndpoint}?employer_id=${employerId}`),
        axios.get(applicationsEndpoint) // Necesitamos todas las postulaciones para contarlas después
    ]);
};

export const getPublicationById = (id) => axios.get(`${jobOffersEndpoint}/${id}`);
export const addPublication = (publication) => axios.post(jobOffersEndpoint, publication);
export const updatePublication = (id, publication) => axios.put(`${jobOffersEndpoint}/${id}`, publication);
export const deletePublication = (id) => axios.delete(`${jobOffersEndpoint}/${id}`);