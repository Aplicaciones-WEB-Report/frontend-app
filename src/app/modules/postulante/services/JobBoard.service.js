import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getJobBoardData = (candidateId) => {
    return Promise.all([
        axios.get(`${API_URL}/job_offers?status=Activa`),
        axios.get(`${API_URL}/applications?candidate_id=${candidateId}`)
    ]);
};

export const applyToJob = (applicationData) => {
    return axios.post(`${API_URL}/applications`, applicationData);
};