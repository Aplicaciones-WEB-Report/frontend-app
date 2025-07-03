import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getMyApplicationsData = (candidateId) => {
    return Promise.all([
        axios.get(`${API_URL}/applications?candidate_id=${candidateId}`),
        axios.get(`${API_URL}/job_offers`),
        axios.get(`${API_URL}/messages`)
    ]);
};

export const withdrawApplication = (applicationId) => {
    return axios.delete(`${API_URL}/applications/${applicationId}`);
};