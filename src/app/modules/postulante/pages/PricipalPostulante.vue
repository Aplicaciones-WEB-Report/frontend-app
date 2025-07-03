<script>
import Card from "primevue/card";
import Chart from "primevue/chart";
import {getNotificationsData} from "../services/Notification.service.js";

export default {
  name: "PanelPricipal",
  components: { Card, Chart },
  data() {
    return {
      publicaciones: [
        { titulo: "Postulación 1", solicitudes: 3 },
        { titulo: "Postulación 2", solicitudes: 7 },
        { titulo: "Postulación 3", solicitudes: 8 },
      ],
      chartData1: {
        labels: ['Publicación 1', 'Publicación 2', 'Publicación 3', 'Publicación 4'],
        datasets: [
          {
            label: 'Aplicaciones',
            backgroundColor: ['#b2e4b2', '#a2d4a2', '#91c291', '#80b180'],
            data: [32, 15, 10, 20]
          }
        ]
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: { display: false }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },

      notifications: [],
      isLoadingNotifications: true,
      currentUserId: '1',
    };
  },
  methods: {
    async cargarNotificaciones() {
      this.isLoadingNotifications = true;
      try {
        const [messagesResponse, applicationsResponse, jobOffersResponse] = await getNotificationsData();

        const allMessages = messagesResponse.data;
        const allApplications = applicationsResponse.data;
        const allJobOffers = jobOffersResponse.data;

        const userMessages = allMessages.filter(msg =>
            String(msg.sender_id) === String(this.currentUserId) ||
            String(msg.receiver_id) === String(this.currentUserId)
        );

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
      } finally {
        this.isLoadingNotifications = false;
      }
    }
  },
  mounted() {
    this.cargarNotificaciones();
  }
}
</script>

<template>
  <div class="dashboard">
    <div class="header">
      <h2>Publicaciones Recientes</h2>
    </div>

    <div class="cards">
      <div v-for="(pub, index) in publicaciones" :key="index" class="card-container">
        <Card class="card">
          <template #title>
            <p class="subtitle"><i class="pi pi-briefcase icon"></i> Título</p>
            <span class="titulo">{{ pub.titulo }}</span>
          </template>
          <template #footer>
            <p class="subtitle"><i class="pi pi-users icon"></i> N° Solicitudes</p>

            <p class="count">{{ pub.solicitudes }} Aplicaciones</p>
          </template>
        </Card>
      </div>
    </div>

    <div class="inbox-section">
      <div class="header-inbox p-mb-3">
        <h2>Bandeja de Entrada</h2>
      </div>

      <div v-if="isLoadingNotifications" class="loading-message">
        Cargando mensajes...
      </div>

      <div v-else-if="notifications.length > 0" class="notifications-list">
        <div
            v-for="notification in notifications"
            :key="notification.id"
            class="notification-item p-d-flex p-flex-column p-sm-flex-row p-ai-start"
        >
          <div class="avatar p-mb-2 p-sm-mb-0 p-mr-0 p-sm-mr-3"></div>
          <div class="content-inbox">
            <p class="publication-title">{{ notification.publicationTitle }}</p>
            <p class="message-text">{{ notification.content }}</p>
          </div>
        </div>
      </div>

      <div v-else class="no-notifications">
        No tienes mensajes nuevos.
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard {
  padding: 20px;
  background-color: #f5f9f7;
  font-family: 'Segoe UI', sans-serif;
}

.header {
  background-color: #1d578c;
  color: #fff;
  padding: 16px 24px;
  border-radius: 12px;
  text-align: center;
  margin-bottom: 30px;
}
.header h2 {
  margin: 0;
  font-size: 1.6rem;
  font-weight: 600;
}


.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 40px;
}
.card-container {
  flex: 1 1 260px;
  max-width: 300px;
}
.card {
  background-color: #ffffff;
  border-radius: 16px;
  box-shadow: 0 6px 12px rgba(0,0,0,0.08);
  padding: 20px;
  text-align: center;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-4px);
}
.titulo {
  display: block;
  background-color: rgba(5, 186, 162, 0.27);
  padding: 12px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1.1rem;
  color: #34495e;
}
.subtitle {
  margin: 10px 0 4px;
  color: #7f8c8d;
  font-size: 0.9rem;
}
.count {
  background-color: #ecf0f1;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px;
  border-radius: 8px;
  color: #2c3e50;
}

@media (max-width: 768px) {
  .cards {
    flex-direction: column;
    align-items: center;
  }
  .card-container {
    max-width: 100%;
  }
}
.inbox-section {
  margin-top: 40px;
}

.header-inbox {
  background-color: #68c25c;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
}

.header-inbox h2 {
  text-align: center;
  margin: 0;
  margin-top: -4px;
}

.notifications-list {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.notification-item {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

@media (min-width: 576px) {
  .notification-item {
    flex-direction: row;
    align-items: flex-start;
  }
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d1d5db;
  margin-bottom: 1rem;
}

@media (min-width: 576px) {
  .avatar {
    margin-bottom: 0;
    margin-right: 1rem;
  }
}

.content-inbox {
  display: flex;
  flex-direction: column;
}

.publication-title {
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 0.25rem 0;
  font-size: 14px;
}

.message-text {
  margin: 0;
  color: #4b5563;
  line-height: 1.5;
  font-size: 13px;
}

.loading-message,
.no-notifications {
  text-align: center;
  padding: 3rem;
  color: #6b7280;
  font-size: 1.1rem;
  background-color: #fff;
  border-radius: 12px;
}
</style>
