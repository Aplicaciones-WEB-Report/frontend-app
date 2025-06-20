import axios from 'axios';

const API_URL = 'http://localhost:3000';

export const getNotificationsData = () => {
    return Promise.all([
        axios.get(`${API_URL}/messages`),
        axios.get(`${API_URL}/applications`),
        axios.get(`${API_URL}/job_offers`)
    ]);
};