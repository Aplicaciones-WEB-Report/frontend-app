import axios from 'axios';
const API_URL = 'http://localhost:3000';

export const CandidatoService = {
    async obtenerCandidatosPorReclutador(reclutadorId) {
        try {
            // 1. Obtener TODAS las ofertas, postulaciones y usuarios candidatos en paralelo.
            // Es más eficiente que hacer peticiones encadenadas.
            const [ofertasResponse, postulacionesResponse, usuariosResponse] = await Promise.all([
                axios.get(`${API_URL}/job_offers`),
                axios.get(`${API_URL}/applications`),
                axios.get(`${API_URL}/users?role=candidate`)
            ]);

            const todasLasOfertas = ofertasResponse.data;
            const todasLasPostulaciones = postulacionesResponse.data;
            const todosLosCandidatos = usuariosResponse.data;

            // 2. Filtrar para obtener solo las ofertas que pertenecen al reclutador logueado.
            const misOfertas = todasLasOfertas.filter(oferta => oferta.employer_id === reclutadorId);
            const misOfertasIds = new Set(misOfertas.map(o => o.id)); // Usar un Set es más rápido para búsquedas.

            if (misOfertasIds.size === 0) {
                return []; // Si no hay ofertas, no puede haber candidatos.
            }

            // 3. Filtrar las postulaciones que corresponden a mis ofertas.
            const postulacionesAMisOfertas = todasLasPostulaciones.filter(app => misOfertasIds.has(app.job_offer_id));

            // 4. Mapear y enriquecer los datos del candidato para cada postulación.
            const candidatosFinales = postulacionesAMisOfertas.map(postulacion => {
                // Encontrar la información completa del candidato que hizo la postulación.
                const infoCandidato = todosLosCandidatos.find(user => user.id === postulacion.candidate_id);

                // Encontrar la información de la oferta a la que se postuló.
                const infoOferta = misOfertas.find(oferta => oferta.id === postulacion.job_offer_id);

                // Si por alguna razón los datos no existen, no incluimos esta postulación.
                if (!infoCandidato || !infoOferta) {
                    return null;
                }

                return {
                    id: postulacion.id, // ID de la postulación, útil para actualizar estado.
                    user_id: infoCandidato.id,
                    name: infoCandidato.name,
                    publicationNumber: infoOferta.title, // Nombre de la publicación.
                    cv: postulacion.cv_url, // CV (si lo tuvieras en la tabla users).
                    posible: postulacion.status !== 'denied', // Lógica de estado.
                    status: postulacion.status
                };
            }).filter(candidato => candidato !== null); // Limpiamos cualquier resultado nulo.

            return candidatosFinales;

        } catch (error) {
            console.error("Error detallado al obtener candidatos:", error);
            return []; // Devuelve un array vacío en caso de error.
        }
    },

    async actualizarCandidato(candidatoActualizado) {
        // La actualización de estado se hace sobre la postulación (application)
        const response = await axios.patch(`${API_URL}/applications/${candidatoActualizado.id}`, {
            status: candidatoActualizado.posible ? 'pending' : 'denied'
        });
        return response.data;
    }
};