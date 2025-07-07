import axios from 'axios';

const API_URL = 'https://app-250706133042.azurewebsites.net/api';

const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No se encontró token de autenticación.");
        return {};
    }
    return {
        headers: { Authorization: `Bearer ${token}` }
    };
};

export const CandidatoService = {
    async obtenerCandidatosParaMisOfertas() {
        try {
            const response = await axios.get(`${API_URL}/applications/my-offers`, getAuthHeaders());

            console.log("✅ Respuesta recibida del backend:", response.data);

            const applications = response.data;

            const candidatosFinales = applications.map(app => ({
                id: app.application_id,
                user_id: app.candidate_id,
                name: `Candidato #${app.candidate_id}`,
                publicationNumber: `Oferta #${app.job_offer_id}`,
                cv: app.cv_url,
                status: app.status || 'pending',
                posible: (app.status || 'pending') !== 'denied',
            }));

            return candidatosFinales;
        } catch (error) {
            console.error("❌ Error al llamar a /api/applications/my-offers:", error.response?.data || error.message);
            return [];
        }
    },

    async actualizarCandidato(candidatoActualizado) {
        console.warn("Funcionalidad 'actualizarCandidato' no implementada en el backend.");
        return Promise.resolve(candidatoActualizado);
    }
};