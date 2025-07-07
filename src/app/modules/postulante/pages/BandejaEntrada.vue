<script>
import { getMyInboxMessages } from "../services/Notification.service.js";

export default {
  name: "BandejaEntrada",
  data() {
    return {
      messages: [],
      isLoading: true,
    };
  },
  methods: {
    async cargarMensajes() {
      this.isLoading = true;
      try {
        // Llamamos al servicio que consulta el endpoint /api/messages/inbox
        const messagesFromApi = await getMyInboxMessages();

        // El backend devuelve un MessageDto: { id, sender_id, content, sent_at }
        // Lo mapeamos para que se ajuste a la vista.
        this.messages = messagesFromApi.map(msg => ({
          id: msg.id,
          // Para mejorar esto, necesitaríamos más datos del backend.
          publicationTitle: `Mensaje del Empleador #${msg.sender_id}`,
          content: msg.content,
          sent_at: msg.sent_at
        }));

      } catch (error) {
        console.error("Error al cargar la bandeja de entrada:", error);
        alert("No se pudieron cargar los mensajes.");
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.cargarMensajes();
  }
};
</script>

<template>
  <div class="notifications-container">
    <div v-if="isLoading" class="loading-message">
      Cargando notificaciones...
    </div>

    <div v-else-if="messages.length > 0" class="notifications-list">
      <div v-for="notification in messages" :key="notification.id" class="notification-item">
        <div class="avatar"></div>
        <div class="content">
          <p class="publication-title">{{ notification.publicationTitle }}</p>
          <p class="message-text">{{ notification.content }}</p>
        </div>
      </div>
    </div>

    <div v-else class="no-notifications">
      {{ $t("sin_notificaciones") }}
    </div>
  </div>
</template>

<style scoped>
.notifications-container {
  max-width: 800px;
  margin: 2rem auto;
  background-color: #f0fdf4;
  border: 1px solid #dcfce7;
  border-radius: 1rem;
  padding: 1.5rem;
  min-height: 500px;
}

.notifications-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #e5e7eb;
}

.avatar {
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d1d5db;
  margin-right: 1rem;
}

.content {
  display: flex;
  flex-direction: column;
}

.publication-title {
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
}

.message-text {
  margin: 0;
  color: #4b5563;
  line-height: 1.5;
}

.loading-message, .no-notifications {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1.1rem;
}
</style>