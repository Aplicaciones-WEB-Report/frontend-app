import axios from 'axios';

const API_URL = 'http://localhost:5195/api';

// 👉 Función para obtener el token del localStorage
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

/**
 * Obtiene las ofertas activas desde el backend
 * para mostrarlas al candidato.
 */
export const getJobBoardData = async () => {
    try {
        const response = await axios.get(`${API_URL}/joboffers`, getAuthHeaders());

        // Convertimos status numérico a texto
        const offers = response.data.map(offer => ({
            ...offer,
            status: offer.status === 0 ? "Activa" : "Borrador"
        }));

        return offers;
    } catch (error) {
        console.error("Error al obtener ofertas:", error);
        throw error;
    }
};

/**
 * Envía una postulación a una oferta
 */
export const applyToJob = async (applicationData) => {
    try {
        const response = await axios.post(`${API_URL}/Applications`, applicationData, getAuthHeaders());
        return response.data;
    } catch (error) {
        console.error("Error al postular:", error);
        throw error;
    }
};