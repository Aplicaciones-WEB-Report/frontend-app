<script>


import {getMyApplicationsData, withdrawApplication} from "../services/Application.service.js";

export default {
  name: "MisPostulaciones",
  data() {
    return {
      currentUserId: '1',
      misPostulaciones: [],
      filtroTitulo: '',
      postulacionSeleccionada: null,
      modalVer: false,
    };
  },
  computed: {
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
          <div class="table-cell" :data-label="'Título'">{{ postulacion.title }}</div>
          <div class="table-cell" :data-label="'Resultado'">
            <span class="status-badge">{{ postulacion.resultado }}</span>
          </div>
          <div class="table-cell" :data-label="'Mensajes'">{{ postulacion.messageCount }}</div>
          <div class="table-cell actions" :data-label="'Acciones'">
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
  box-sizing: border-box;
  overflow-x: hidden;
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
  width: 100%;
  max-width: 300px;
}

/* ==== Tabla para escritorio ==== */
.postulaciones-table {
  display: grid;
  grid-template-columns: 2.5fr 1fr 1fr 1.5fr;
  gap: 1rem;
  padding: 1rem;
  background-color: #fafafa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  width: 100%;
  box-sizing: border-box;
}

.table-header {
  background-color: #b6e3a9;
  color: #333;
  font-weight: 600;
  padding: 1rem;
  text-align: center;
  border-radius: 8px;
}

.table-cell {
  background-color: #ffffff;
  padding: 1rem;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  word-break: break-word;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.action-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  color: #ffffff;
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
  background-color: #e8e8e8;
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

/* ==== Modal ==== */
.modal {
  position: fixed;
  z-index: 1000;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: #ffffff;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
}

.modal-content h3 {
  margin-top: 0;
}

.modal-content button {
  background-color: #4364ab;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  margin-top: 1rem;
}

@media (max-width: 768px) {
  .postulaciones-table {
    display: flex;
    flex-direction: column;
    padding: 0.5rem;
    gap: 1.5rem; /* separa cada tarjeta */
  }

  .table-header {
    display: none;
  }

  .table-cell {
    display: block;
    width: 100%;
    padding: 1rem;
    font-size: 0.95rem;
    background-color: #f8f8f8;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
    margin-bottom: 0.5rem;
  }

  .table-cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: #444;
    display: block;
    margin-bottom: 0.5rem;
  }

  .actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .action-btn {
    font-size: 0.85rem;
    padding: 8px 12px;
    flex: 1;
    white-space: nowrap;
  }
}

</style>
