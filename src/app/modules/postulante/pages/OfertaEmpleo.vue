<script>
import { applyToJob, getJobBoardData } from "../services/JobBoard.service.js";
import PostularModal from '../components/PostularModal.vue';

export default {
  name: "OfertasEmpleo",
  components: { PostularModal },
  data() {
    return {
      jobOffers: [],
      myAppliedIds: new Set(),
      isLoading: true,
      filtroBusqueda: '',
      mostrarModalPostular: false,
      ofertaSeleccionada: null,
    };
  },
  computed: {
    ofertasFiltradas() {
      if (!this.filtroBusqueda) { return this.jobOffers; }
      return this.jobOffers.filter(offer =>
          offer.title.toLowerCase().includes(this.filtroBusqueda.toLowerCase()) ||
          offer.location.toLowerCase().includes(this.filtroBusqueda.toLowerCase())
      );
    }
  },
  methods: {
    async cargarOfertas() {
      this.isLoading = true;
      try {
        const offers = await getJobBoardData();
        this.jobOffers = offers;
        const misPostulaciones = JSON.parse(localStorage.getItem('my-applications')) || [];
        this.myAppliedIds = new Set(misPostulaciones.map(app => String(app.jobOfferId)));
      } catch (error) {
        console.error("Error al cargar ofertas de empleo:", error);
      } finally {
        this.isLoading = false;
      }
    },
    abrirModalPostular(oferta) {
      this.ofertaSeleccionada = oferta;
      this.mostrarModalPostular = true;
    },
    cerrarModalPostular() {
      this.mostrarModalPostular = false;
      this.ofertaSeleccionada = null;
    },
    async postular(cvUrl) {
      if (!this.ofertaSeleccionada) return alert("Error al procesar la postulación.");

      // ✅ 1. PAYLOAD CORRECTO para el backend
      const payloadAPI = {
        job_offer_id: this.ofertaSeleccionada.id,
        cv_url: cvUrl,
      };

      try {
        await applyToJob(payloadAPI); // Envío a la base de datos

        // ✅ 2. GUARDADO EN LOCALSTORAGE para la vista del postulante
        const misPostulaciones = JSON.parse(localStorage.getItem('my-applications')) || [];
        const nuevaPostulacionLocal = {
          applicationId: `local-${Date.now()}`,
          jobOfferId: this.ofertaSeleccionada.id,
          title: this.ofertaSeleccionada.title,
          description: this.ofertaSeleccionada.description,
          status: 'pending' // Siempre 'pending' para el postulante
        };
        misPostulaciones.push(nuevaPostulacionLocal);
        localStorage.setItem('my-applications', JSON.stringify(misPostulaciones));

        alert("¡Has postulado exitosamente!");
        this.myAppliedIds.add(String(this.ofertaSeleccionada.id));
        this.cerrarModalPostular();
      } catch (error) {
        console.error("Error al postular:", error.response?.data || error.message);
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
      <h1>{{ $t("encuentra_desafio") }}</h1>
      <p>{{ $t("explora_oportunidades") }}</p>
      <input
          v-model="filtroBusqueda"
          type="text"
          :placeholder="$t('placeholder_busqueda')"
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
        {{ $t("sin_resultados") }}
      </div>
    </div>

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