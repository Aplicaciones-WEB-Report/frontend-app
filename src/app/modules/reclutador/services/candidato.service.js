const API_URL = 'http://localhost:3500/candidate_profiles';

export const CandidatoService = {
    async obtenerCandidatos() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Error al obtener candidatos');
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }
};
