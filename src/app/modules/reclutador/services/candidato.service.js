const API_URL = 'http://localhost:3000/candidate_profiles';

export const CandidatoService = {
    async obtenerCandidatos() {
        try {
            const response = await fetch(API_URL);
            return await response.json();
        } catch (error) {
            console.error('Error al obtener candidatos:', error);
            return [];
        }
    },

    async actualizarCandidato(candidato) {
        try {
            const response = await fetch(`${API_URL}/${candidato.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    posible: candidato.posible
                })
            });
            return await response.json();
        } catch (error) {
            console.error('Error al actualizar el estado del candidato:', error);
        }
    }
};
