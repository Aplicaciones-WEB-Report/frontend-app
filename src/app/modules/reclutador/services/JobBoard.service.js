import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getJobBoardData = (candidateId) => {
    return Promise.all([
        // 1. Trae solo las ofertas de trabajo que están "Activa"
        axios.get(`${API_URL}/job_offers?status=Activa`),
        // 2. Trae las postulaciones existentes del candidato para saber a qué ya aplicó
        axios.get(`${API_URL}/applications?candidate_id=${candidateId}`)
    ]);
};

export const applyToJob = (applicationData) => {
    return axios.post(`${API_URL}/applications`, applicationData);
};