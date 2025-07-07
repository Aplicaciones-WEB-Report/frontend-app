<script>
import CandidatoFiltro from '../components/candidato/CandidatoFiltro.vue'
import CandidatoTabla from '../components/candidato/CandidatoTabla.vue'
import CandidatoModal from '../components/candidato/CandidatoModal.vue'
import ContactarModal from '../components/candidato/ContactarModal.vue'
// ✅ Asegúrate que la ruta de importación sea la correcta
import { CandidatoService } from '../../postulante/services/candidato.service.js'
import { MessageService } from '../services/Message.service.js'

export default {
  name: 'Candidatos',
  components: {
    CandidatoFiltro,
    CandidatoTabla,
    CandidatoModal,
    ContactarModal
  },
  data() {
    return {
      filtroNombre: '',
      candidatos: [],
      isLoading: true, // Añadimos un estado de carga
      mostrarModal: false,
      modalData: {},
      mostrarModalContacto: false,
      candidatoParaContactar: {}
    }
  },
  computed: {
    candidatosFiltrados() {
      if (!this.filtroNombre) {
        return this.candidatos;
      }
      return this.candidatos.filter(c =>
          c.name.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    },
  },
  methods: {
    async cargarCandidatos() {
      this.isLoading = true; // Inicia la carga
      this.candidatos = []; // Limpiamos la lista anterior
      try {
        // Llamamos al servicio que consulta la API
        const datosDesdeServicio = await CandidatoService.obtenerCandidatosParaMisOfertas();
        this.candidatos = datosDesdeServicio;
      } catch (error) {
        console.error("Error en el componente Candidatos.vue al cargar datos:", error);
        alert("No se pudieron cargar los candidatos.");
      } finally {
        this.isLoading = false; // Finaliza la carga
      }
    },
    abrirModal(candidato) {
      this.modalData = { ...candidato };
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    async actualizarEstado(candidatoActualizado) {
      // Esta función sigue sin implementación en backend, pero mantenemos la lógica UI
      const index = this.candidatos.findIndex(c => c.id === candidatoActualizado.id);
      if (index !== -1) {
        this.candidatos[index].posible = candidatoActualizado.posible;
        this.candidatos[index].status = candidatoActualizado.posible ? 'Posible' : 'Denegado';
        await CandidatoService.actualizarCandidato(candidatoActualizado);
      }
      this.cerrarModal();
    },
    abrirModalContacto(candidato) {
      this.candidatoParaContactar = candidato;
      this.mostrarModalContacto = true;
    },
    cerrarModalContacto() {
      this.mostrarModalContacto = false;
    },
    async enviarMensaje(mensaje) {
      if (!this.candidatoParaContactar) return;

      const messageData = {
        receiver_id: this.candidatoParaContactar.user_id,
        content: mensaje
      };

      try {
        await MessageService.sendMessage(messageData);
        alert('¡Mensaje enviado con éxito!');
        this.cerrarModalContacto();
      } catch (error) {
        alert('Hubo un error al enviar el mensaje.');
      }
    }
  },
  mounted() {
    this.cargarCandidatos();
  }
}
</script>

<template>
  <div class="reclutador-candidatos">
    <h2 class="text-2xl font-bold mb-4">Candidatos</h2>
    <div class="mb-4">
      <CandidatoFiltro v-model:filtro="filtroNombre" />
    </div>

    <!-- Mostramos un mensaje de carga -->
    <div v-if="isLoading" class="loading-message">
      Cargando candidatos...
    </div>

    <!-- La tabla se muestra solo si no está cargando -->
    <div v-else class="overflow-auto">
      <CandidatoTabla
          :candidatos="candidatosFiltrados"
          @verMas="abrirModal"
          @contactar="abrirModalContacto"
      />
      <!-- El mensaje de "No hay candidatos" se mostrará dentro de CandidatoTabla si el array está vacío -->
    </div>

    <CandidatoModal
        v-if="mostrarModal"
        :candidato="modalData"
        @actualizar="actualizarEstado"
        @cerrar="cerrarModal"
    />

    <ContactarModal
        v-if="mostrarModalContacto"
        :candidato="candidatoParaContactar"
        @cerrar="cerrarModalContacto"
        @enviar="enviarMensaje"
    />
  </div>
</template>

<style scoped>
.reclutador-candidatos {
  padding: 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3e50;
}
.loading-message {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
  color: #555;
}
</style>