<script>


import {getMyApplicationsData, withdrawApplication} from "../services/Application.service.js";

export default {
  name: "MisPostulaciones",
  data() {
    return {
      // Asumimos que el ID del usuario logueado es '1'. En una app real,
      // esto vendría de un state manager (Vuex/Pinia) o del local storage.
      currentUserId: '1',
      misPostulaciones: [],
      filtroTitulo: '',
      // Para el futuro modal de "Ver detalles"
      postulacionSeleccionada: null,
      modalVer: false,
    };
  },
  computed: {
    // Filtramos las postulaciones mostradas según el campo de búsqueda
    postulacionesFiltradas() {
      if (!this.filtroTitulo) {
        return this.misPostulaciones;
      }
      return this.misPostulaciones.filter(postulacion =>
          postulacion.title.toLowerCase().includes(this.filtroTitulo.toLowerCase())
      );
    },
  },
  methods: {
    async cargarMisPostulaciones() {
      try {
        const [myAppsResponse, jobOffersResponse, messagesResponse] = await getMyApplicationsData(this.currentUserId);

        const myApplications = myAppsResponse.data;
        const allJobOffers = jobOffersResponse.data;
        const allMessages = messagesResponse.data;

        const dataParaLaTabla = myApplications.map(application => {
          // AQUÍ ESTÁ LA CORRECCIÓN
          const jobOffer = allJobOffers.find(offer => String(offer.id) === String(application.job_offer_id));

          const messageCount = allMessages.filter(msg => String(msg.application_id) === String(application.id)).length;

          return {
            applicationId: application.id,
            jobOfferId: application.job_offer_id,
            title: jobOffer ? jobOffer.title : 'Oferta no encontrada',
            resultado: application.status,
            messageCount: messageCount,
            description: jobOffer ? jobOffer.description : ''
          };
        });

        this.misPostulaciones = dataParaLaTabla;
      } catch (error) {
        console.error("Error al cargar mis postulaciones:", error);
        alert("No se pudieron cargar tus postulaciones.");
      }
    },

    async eliminarPostulacion(applicationId) {
      if (!confirm("¿Estás seguro de que quieres retirar tu postulación?")) {
        return;
      }
      try {
        await withdrawApplication(applicationId);
        // Eliminamos la postulación de la lista local para actualizar la UI al instante
        this.misPostulaciones = this.misPostulaciones.filter(p => p.applicationId !== applicationId);
        alert("Postulación retirada exitosamente.");
      } catch (error) {
        console.error("Error al retirar la postulación:", error);
        alert("No se pudo retirar la postulación.");
      }
    },

    abrirModalVer(postulacion) {
      this.postulacionSeleccionada = postulacion;
      this.modalVer = true;
    }
  },
  mounted() {
    this.cargarMisPostulaciones();
  }
};
</script>

<template>
  <div class="mis-postulaciones-container">
    <h1>Postulaciones</h1>
    <p class="subtitle">Mis Postulaciones</p>

    <div class="controls">
      <input
          v-model="filtroTitulo"
          type="text"
          placeholder="Buscar por título..."
          class="search-input"
      />
    </div>

    <div class="postulaciones-table">
      <div class="table-header">Título</div>
      <div class="table-header">Resultado</div>
      <div class="table-header">Mensajes</div>
      <div class="table-header">Acciones</div>

      <template v-if="postulacionesFiltradas.length > 0">
        <template v-for="postulacion in postulacionesFiltradas" :key="postulacion.applicationId">
          <div class="table-cell">{{ postulacion.title }}</div>
          <div class="table-cell">
            <span class="status-badge">{{ postulacion.resultado }}</span>
          </div>
          <div class="table-cell">{{ postulacion.messageCount }}</div>
          <div class="table-cell actions">
            <button class="action-btn ver" @click="abrirModalVer(postulacion)">Ver</button>
            <button class="action-btn eliminar" @click="eliminarPostulacion(postulacion.applicationId)">Eliminar</button>
          </div>
        </template>
      </template>
      <div v-else class="no-data">
        No has realizado ninguna postulación.
      </div>
    </div>

    <div v-if="modalVer" class="modal">
      <div class="modal-content">
        <h3>{{ postulacionSeleccionada.title }}</h3>
        <p>{{ postulacionSeleccionada.description }}</p>
        <button @click="modalVer = false">Cerrar</button>
      </div>
    </div>

  </div>
</template>

<style scoped>
.mis-postulaciones-container {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}
.subtitle {
  color: #555;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}
.controls {
  margin-bottom: 2rem;
}
.search-input {
  padding: 0.8rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  width: 300px;
}
.postulaciones-table {
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1.5fr; /* Ajusta las proporciones de las columnas */
  gap: 1rem;
  padding: 1rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
}
.table-header {
  background-color: #b6e3a9; /* Tono verde claro */
  color: #333;
  font-weight: 600;
  padding: 1rem;
  text-align: center;
  border-radius: 8px;
}
.table-cell {
  background-color: #f8f8f8;
  padding: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}
.actions {
  gap: 0.5rem;
}
.action-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
  transition: transform 0.2s;
}
.action-btn:hover {
  transform: translateY(-2px);
}
.ver {
  background-color: #2e629a;
}
.eliminar {
  background-color: #626262;
}
.status-badge {
  background-color: #e0e0e0;
  padding: 6px 14px;
  border-radius: 16px;
  font-size: 0.9em;
  font-weight: 500;
}
.no-data {
  grid-column: 1 / -1;
  text-align: center;
  padding: 3rem;
  color: #888;
}

/* Estilos de Modal genéricos */
.modal { position: fixed; z-index: 1000; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; }
.modal-content { background: #ffffff; padding: 2rem; border-radius: 12px; width: 90%; max-width: 500px; }
.modal-content h3 { margin-top: 0; }
.modal-content button { background-color: #4364ab; color: white; padding: 10px 20px; border-radius: 8px; border: none; cursor: pointer; margin-top: 1rem; }
</style>