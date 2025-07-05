<script>
import {getNotificationsData} from "../services/Notification.service.js";

export default {
  name: "BandejaEntrada",
  data() {
    return {
      // currentUserId: '1', // <-- Lo vamos a obtener dinámicamente
      notifications: [],
      isLoading: true,
    };
  },
  methods: {
    async cargarNotificaciones() {
      // --- NUEVO: OBTENER EL ID DEL USUARIO LOGUEADO ---
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser) {
        this.isLoading = false;
        alert("No se pudo identificar al usuario.");
        return;
      }
      const currentUserId = currentUser.id;
      // ---------------------------------------------

      this.isLoading = true;
      try {
        const [messagesResponse, applicationsResponse, jobOffersResponse] = await getNotificationsData();

        const allMessages = messagesResponse.data;
        const allApplications = applicationsResponse.data;
        const allJobOffers = jobOffersResponse.data;

        // La lógica de filtrado ahora usa el ID dinámico
        const userMessages = allMessages.filter(msg =>
            String(msg.sender_id) === String(currentUserId) ||
            String(msg.receiver_id) === String(currentUserId)
        );

        // ... el resto de la lógica no cambia ...
        const enrichedNotifications = userMessages.map(message => {
          let publicationTitle = 'Conversación General';

          const application = allApplications.find(app => String(app.id) === String(message.application_id));

          if (application) {
            const jobOffer = allJobOffers.find(offer => String(offer.id) === String(application.job_offer_id));
            if (jobOffer) {
              publicationTitle = jobOffer.title;
            }
          }

          return {
            id: message.id,
            publicationTitle: publicationTitle,
            content: message.content,
            sent_at: message.sent_at
          };
        });

        this.notifications = enrichedNotifications.sort((a, b) => new Date(b.sent_at) - new Date(a.sent_at));

      } catch (error) {
        console.error("Error al cargar las notificaciones:", error);
        alert("No se pudieron cargar las notificaciones.");
      } finally {
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.cargarNotificaciones();
  }
};
</script>

<template>
  <div class="notifications-container">
    <div v-if="isLoading" class="loading-message">
      Cargando notificaciones...
    </div>

    <div v-else-if="notifications.length > 0" class="notifications-list">
      <div v-for="notification in notifications" :key="notification.id" class="notification-item">
        <div class="avatar"></div>
        <div class="content">
          <p class="publication-title">{{ notification.publicationTitle }}</p>
          <p class="message-text">{{ notification.content }}</p>
        </div>
      </div>
    </div>

    <div v-else class="no-notifications">
      No tienes notificaciones nuevas.
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