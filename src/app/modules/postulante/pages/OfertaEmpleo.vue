<script>
import { applyToJob, getJobBoardData } from "../services/JobBoard.service.js";
import PostularModal from '../components/PostularModal.vue'; // <-- Importar el nuevo modal

export default {
  name: "OfertasEmpleo",
  components: { PostularModal }, // <-- Registrar el nuevo modal
  data() {
    return {
      jobOffers: [],
      myAppliedIds: new Set(),
      isLoading: true,
      filtroBusqueda: '',
      // --- NUEVOS ESTADOS PARA EL MODAL ---
      mostrarModalPostular: false,
      ofertaSeleccionada: null,
    };
  },
  computed: {
    ofertasFiltradas() {
      if (!this.filtroBusqueda) {
        return this.jobOffers;
      }
      return this.jobOffers.filter(offer =>
          offer.title.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
          offer.location.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
      );
    }
  },
  methods: {
    getUserId() {
      const user = JSON.parse(localStorage.getItem('user'));
      return user ? user.id : null;
    },
    async cargarOfertas() {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !token) {
        this.isLoading = false;
        return;
      }

      this.isLoading = true;

      try {
        const offers = await getJobBoardData();
        this.jobOffers = offers;
        this.myAppliedIds = new Set(); // podrías llenarlo si tienes endpoint de postulaciones
      } catch (error) {
        console.error("Error al cargar ofertas de empleo:", error);
      } finally {
        this.isLoading = false;
      }
    },

    // --- NUEVOS MÉTODOS PARA MANEJAR EL MODAL ---
    abrirModalPostular(oferta) {
      this.ofertaSeleccionada = oferta;
      this.mostrarModalPostular = true;
    },
    cerrarModalPostular() {
      this.mostrarModalPostular = false;
      this.ofertaSeleccionada = null;
    },
    // La lógica de postulación ahora recibe la URL del CV
    async postular(cvUrl) {
      const userId = this.getUserId();
      if (!userId || !this.ofertaSeleccionada) {
        alert("Error al procesar la postulación. Inténtalo de nuevo.");
        return;
      }

      const payload = {
        job_offer_id: String(this.ofertaSeleccionada.id),
        candidate_id: String(userId),
        cv_url: cvUrl, // <-- Guardamos la URL del CV
        application_date: new Date().toISOString(),
        status: 'pending'
      };

      try {
        await applyToJob(payload);
        alert("¡Has postulado exitosamente!");
        this.myAppliedIds.add(String(this.ofertaSeleccionada.id));
        this.cerrarModalPostular(); // Cerramos el modal tras el éxito
      } catch (error) {
        console.error("Error al postular:", error);
        alert("Hubo un error al enviar tu postulación.");
      }
    }
  },
  mounted() {
    this.cargarOfertas();
  }
};
</script>
<template>
  <div class="job-board-container">
    <div class="board-header">
      <h1>Encuentra tu Próximo Desafío</h1>
      <p>Explora las últimas oportunidades que tenemos para ti.</p>
      <input
          v-model="filtroBusqueda"
          type="text"
          placeholder="Buscar por puesto o ubicación..."
          class="search-bar"
      />
    </div>

    <div v-if="isLoading" class="loading">Cargando ofertas...</div>

    <div v-else class="offers-grid">
      <div v-for="offer in ofertasFiltradas" :key="offer.id" class="offer-card">
        <h3 class="offer-title">{{ offer.title }}</h3>
        <p class="offer-location">{{ offer.location }}</p>
        <p class="offer-description">{{ offer.description }}</p>
        <div class="offer-footer">
          <span class="offer-salary">{{ offer.salary_range }}</span>
          <!-- El botón ahora abre el modal en lugar de postular directamente -->
          <button
              @click="abrirModalPostular(offer)"
              :disabled="myAppliedIds.has(String(offer.id))"
              class="apply-btn"
          >
            {{ myAppliedIds.has(String(offer.id)) ? 'Ya Postulaste' : 'Postular' }}
          </button>
        </div>
      </div>
      <div v-if="ofertasFiltradas.length === 0" class="no-results">
        No se encontraron ofertas que coincidan con tu búsqueda.
      </div>
    </div>

    <!-- Añadir el nuevo modal al final del template -->
    <PostularModal
        v-if="mostrarModalPostular"
        :oferta="ofertaSeleccionada"
        @cerrar="cerrarModalPostular"
        @confirmar-postulacion="postular"
    />
  </div>
</template>

<style scoped>
.job-board-container {
  padding: 2rem;
}
.board-header {
  text-align: center;
  margin-bottom: 2.5rem;
}
.board-header h1 {
  font-size: 2.5rem;
  color: #333;
}
.board-header p {
  font-size: 1.2rem;
  color: #666;
}
.search-bar {
  width: 100%;
  max-width: 500px;
  padding: 0.8rem 1rem;
  font-size: 1rem;
  border-radius: 2rem;
  border: 1px solid #ccc;
  margin-top: 1rem;
}
.loading, .no-results {
  text-align: center;
  font-size: 1.2rem;
  color: #888;
  padding: 4rem;
}
.offers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
}
.offer-card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.08);
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
}
.offer-title {
  font-size: 1.4rem;
  color: #2e629a;
  margin: 0 0 0.5rem 0;
}
.offer-location {
  color: #777;
  margin-bottom: 1rem;
}
.offer-description {
  flex-grow: 1;
  color: #555;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}
.offer-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  padding-top: 1rem;
  margin-top: auto;
}
.offer-salary {
  font-weight: 600;
  color: #333;
}
.apply-btn {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;
}
.apply-btn:hover:not(:disabled) {
  background-color: #218838;
}
.apply-btn:disabled {
  background-color: #6c757d;
  cursor: not-allowed;
}
</style>