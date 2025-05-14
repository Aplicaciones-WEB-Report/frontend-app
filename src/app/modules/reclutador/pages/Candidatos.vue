<template>
  <div class="reclutador-candidatos">
    <h2>Candidatos</h2>

    <CandidatoFiltro @filtrar="filtrarCandidatos" v-model:filtro="filtroNombre" />

    <CandidatoTabla :candidatos="candidatosFiltradosMostrados" @verMas="abrirModal" />

    <div class="preguntar-ia-container">
      <button class="preguntar-ia" @click="mostrarTodos">Preguntar IA</button>
    </div>

    <CandidatoModal
        v-if="mostrarModal"
        :candidato="modalData"
        @actualizar="actualizarEstado"
        @cerrar="cerrarModal"
    />
  </div>
</template>

<script>
import CandidatoFiltro from '../components/candidato/CandidatoFiltro.vue'
import CandidatoTabla from '../components/candidato/CandidatoTabla.vue'
import CandidatoModal from '../components/candidato/CandidatoModal.vue'
import { CandidatoService } from '../services/candidato.service.js'
import { Candidato } from '../model/Candidato.entity.js'

export default {
  name: 'Candidato',

  // Register child components
  components: {
    CandidatoFiltro,
    CandidatoTabla,
    CandidatoModal
  },

  data() {
    return {
      filtroNombre: '',            // Search input value
      candidatos: [],              // List of all candidates from the fake API
      mostrarTodosCandidatos: false, // Flag to show one or all candidates
      mostrarModal: false,         // Modal visibility
      modalData: {}                // Candidate selected for modal
    }
  },

  computed: {
    // Filters candidates based on the search input
    candidatosFiltrados() {
      if (!this.filtroNombre) return this.candidatos
      return this.candidatos.filter(c =>
          c.name.toLowerCase().includes(this.filtroNombre.toLowerCase())
      )
    },

    // Controls how many candidates to show: 1 (default) or all (if 'Preguntar IA' clicked)
    candidatosFiltradosMostrados() {
      return this.mostrarTodosCandidatos
          ? this.candidatosFiltrados
          : this.candidatosFiltrados.slice(0, 1)
    }
  },

  methods: {
    /**
     * Loads candidates from the fake API and formats them for display
     */
    async cargarCandidatos() {
      const datos = await CandidatoService.obtenerCandidatos()
      this.candidatos = datos.map(c =>
          Candidato.toDisplayableCandidato(
              new Candidato(c.id, c.name, c.publicationNumber, c.cv, c.posible)
          )
      )
    },

    // When 'Preguntar IA' is clicked, show all filtered candidates
    mostrarTodos() {
      this.mostrarTodosCandidatos = true
    },

    // When 'Filtrar' is clicked, limit results to one (top match)
    filtrarCandidatos() {
      this.mostrarTodosCandidatos = false
    },

    // Opens the modal with selected candidate's info
    abrirModal(candidato) {
      this.modalData = { ...candidato }
      this.mostrarModal = true
    },

    // Closes the modal
    cerrarModal() {
      this.mostrarModal = false
    },

    /**
     * Updates the selected candidate's status both locally and in the fake API
     * @param {Object} candidatoActualizado - The candidate with new 'posible' value
     */
    async actualizarEstado(candidatoActualizado) {
      const index = this.candidatos.findIndex(c => c.id === candidatoActualizado.id)
      if (index !== -1) {
        this.candidatos[index] = { ...candidatoActualizado }
        await CandidatoService.actualizarCandidato(candidatoActualizado)
      }
      this.cerrarModal()
    }
  },

  // Fetches candidate list when the component is mounted
  mounted() {
    this.cargarCandidatos()
  }
}
</script>

<style scoped>
.reclutador-candidatos {
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3e50;
}

.preguntar-ia-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.preguntar-ia {
  background-color: #a2d45e;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
}
</style>