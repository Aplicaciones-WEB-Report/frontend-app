import axios from 'axios';

// La URL base de tu json-server
const API_URL = 'http://localhost:3000';

export const MessageService = {
    /**
     * Envía un nuevo mensaje y lo guarda en la base de datos.
     * @param {object} messageData - { sender_id, receiver_id, content }
     */
    async sendMessage(messageData) {
        const payload = {
            ...messageData,
            sent_at: new Date().toISOString()
            // json-server añadirá un 'id' automáticamente
        };

        try {
            // Hacemos una petición POST directamente al endpoint de mensajes
            const response = await axios.post(`${API_URL}/messages`, payload);
            return response.data;
        } catch (error) {
            console.error('Error al enviar el mensaje:', error);
            throw error; // Propagamos el error para que el componente que lo llama pueda manejarlo
        }
    }
};