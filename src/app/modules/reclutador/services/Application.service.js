import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getMyApplicationsData = (candidateId) => {
    // Hacemos 3 llamadas a la API al mismo tiempo
    return Promise.all([
        // 1. Traemos SOLO las postulaciones del candidato actual
        axios.get(`${API_URL}/applications?candidate_id=${candidateId}`),
        // 2. Traemos TODAS las ofertas de trabajo (para obtener los títulos)
        axios.get(`${API_URL}/job_offers`),
        // 3. Traemos TODOS los mensajes (para contarlos)
        axios.get(`${API_URL}/messages`)
    ]);
};

export const withdrawApplication = (applicationId) => {
    return axios.delete(`${API_URL}/applications/${applicationId}`);
};