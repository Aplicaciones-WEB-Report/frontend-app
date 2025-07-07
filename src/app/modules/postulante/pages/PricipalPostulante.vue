<script>
import Card from "primevue/card";
// Importamos el servicio que SÍ tenemos para obtener los mensajes del candidato
import { getMyInboxMessages } from "../services/Notification.service.js";

export default {
  name: "PricipalPostulante",
  components: { Card },
  data() {
    return {
      publicaciones: [], // Mostrará las postulaciones recientes del localStorage
      notifications: [], // Mostrará los mensajes recibidos de la API
      isLoading: true,
    };
  },
  methods: {
    async cargarDatosDelPanel() {
      this.isLoading = true;

      // --- 1. Cargar Postulaciones desde localStorage ---
      // Esta lógica es local, rápida y no necesita llamadas a la API.
      try {
        const storedApplications = JSON.parse(localStorage.getItem('my-applications')) || [];
        // Mostramos solo las 3 más recientes (las últimas añadidas al array).
        // Invertimos para que la más nueva aparezca primero.
        this.publicaciones = storedApplications.reverse().slice(0, 3).map(app => ({
          titulo: app.title,
          estado: app.status // El estado siempre será 'pending' en esta lógica
        }));
      } catch (e) {
        console.error("Error al leer postulaciones del localStorage:", e);
        this.publicaciones = []; // En caso de error, dejamos la lista vacía.
      }


      // --- 2. Cargar Mensajes desde la API ---
      // Esta lógica sí es asíncrona y consulta el backend.
      try {
        const messagesFromApi = await getMyInboxMessages();
        this.notifications = messagesFromApi.map(msg => ({
          id: msg.id,
          // Para mostrar el nombre del empleador, el backend tendría que enviarlo.
          // Por ahora, mostramos su ID.
          publicationTitle: `Mensaje del Empleador #${msg.sender_id}`,
          content: msg.content,
        })).slice(0, 4); // Mostramos los 4 mensajes más recientes.
      } catch (error) {
        console.error("Error al cargar mensajes para el panel:", error);
        this.notifications = []; // Dejamos la lista vacía si hay un error.
      } finally {
        // La carga finaliza cuando ambas operaciones (local y remota) han terminado.
        this.isLoading = false;
      }
    }
  },
  mounted() {
    this.cargarDatosDelPanel();
  }
}
</script>

<template>
  <div class="dashboard">
    <!-- Sección de Postulaciones Recientes -->
    <div class="header">
      <h2>Postulaciones Recientes</h2>
    </div>

    <div v-if="publicaciones.length > 0" class="cards">
      <div v-for="(pub, index) in publicaciones" :key="index" class="card-container">
        <Card class="card">
          <template #title>
            <p class="subtitle"><i class="pi pi-briefcase icon"></i> Oferta de Trabajo</p>
            <span class="titulo">{{ pub.titulo }}</span>
          </template>
          <template #footer>
            <p class="subtitle"><i class="pi pi-check-circle icon"></i> Estado de tu Postulación</p>
            <p class="count">{{ pub.estado }}</p>
          </template>
        </Card>
      </div>
    </div>
    <div v-else class="no-data-message">
      Aún no has realizado ninguna postulación. ¡Busca empleos y anímate!
    </div>

    <!-- Sección de Bandeja de Entrada -->
    <div class="inbox-section">
      <div class="header-inbox">
        <h2>Bandeja de Entrada</h2>
      </div>

      <!-- Muestra un loader mientras se cargan los mensajes -->
      <div v-if="isLoading && notifications.length === 0" class="loading-message">
        Cargando mensajes...
      </div>

      <div v-else-if="notifications.length > 0" class="notifications-list">
        <div v-for="notification in notifications" :key="notification.id" class="notification-item">
          <div class="avatar"></div>
          <div class="content-inbox">
            <p class="publication-title">{{ notification.publicationTitle }}</p>
            <p class="message-text">{{ notification.content }}</p>
          </div>
        </div>
      </div>

      <!-- Muestra este mensaje solo si no está cargando y no hay mensajes -->
      <div v-else-if="!isLoading && notifications.length === 0" class="no-notifications">
        No tienes mensajes nuevos.
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Copiando los estilos de tu versión anterior y ajustando */
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
  min-height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}
.count {
  background-color: #ecf0f1;
  font-size: 1.2rem;
  font-weight: bold;
  padding: 10px;
  border-radius: 8px;
  color: #2c3e50;
  text-transform: capitalize;
}
.no-data-message {
  text-align: center;
  padding: 2rem;
  background-color: #fff;
  border-radius: 12px;
  margin-bottom: 40px;
  color: #555;
  font-size: 1.1rem;
}
.inbox-section {
  margin-top: 40px;
}
.header-inbox {
  background-color: #68c25c;
  color: white;
  padding: 12px 20px;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 20px;
}
.header-inbox h2 {
  margin: 0;
}
.notifications-list {
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.notification-item {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  display: flex;
  align-items: flex-start;
}
.notification-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}
.avatar {
  min-width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #d1d5db;
  margin-right: 1rem;
}
.content-inbox {
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
  background-color: #fff;
  border-radius: 12px;
}
</style>