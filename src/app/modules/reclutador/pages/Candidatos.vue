<script>
import CandidatoFiltro from '../components/candidato/CandidatoFiltro.vue'
import CandidatoTabla from '../components/candidato/CandidatoTabla.vue'
import CandidatoModal from '../components/candidato/CandidatoModal.vue'
import ContactarModal from '../components/candidato/ContactarModal.vue'
import { CandidatoService } from '../../postulante/services/candidato.service.js'
import { MessageService } from '../services/Message.service.js'
// import { Candidato } from '../model/Candidato.entity.js' // Ya no es necesario

export default {
  name: 'Candidato',
  components: {
    CandidatoFiltro,
    CandidatoTabla,
    CandidatoModal,
    ContactarModal
  },
  data() {
    return {
      filtroNombre: '',
      candidatos: [], // Este será el array final que se muestra en la tabla
      mostrarModal: false,
      modalData: {},
      mostrarModalContacto: false,
      candidatoParaContactar: {}
    }
  },
  computed: {
    candidatosFiltrados() {
      // La computada ahora es mucho más simple.
      if (!this.filtroNombre) {
        return this.candidatos;
      }
      return this.candidatos.filter(c =>
          c.name.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    },
    // La computada 'candidatosFiltradosMostrados' ya no es necesaria si quieres mostrar todo siempre.
  },
  methods: {
    async cargarCandidatos() {
      const currentUser = JSON.parse(localStorage.getItem('user'));
      if (!currentUser || currentUser.role !== 'employer') {
        console.error("No se encontró un reclutador logueado.");
        return;
      }

      // Llamamos al servicio refactorizado.
      const datosDesdeServicio = await CandidatoService.obtenerCandidatosPorReclutador(currentUser.id);

      // Mapeamos directamente al formato que espera la tabla.
      this.candidatos = datosDesdeServicio.map(c => ({
        id: c.id,
        name: c.name,
        publicationNumber: c.publicationNumber,
        cv: c.cv,
        posible: c.posible,
        status: c.posible ? 'Posible' : 'Denegado', // Lógica de estado para la UI
        user_id: c.user_id
      }));
    },
    abrirModal(candidato) {
      this.modalData = { ...candidato };
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    async actualizarEstado(candidatoActualizado) {
      const index = this.candidatos.findIndex(c => c.id === candidatoActualizado.id);
      if (index !== -1) {
        // Actualizamos el estado local para que la UI reaccione inmediatamente.
        this.candidatos[index].posible = candidatoActualizado.posible;
        this.candidatos[index].status = candidatoActualizado.posible ? 'Posible' : 'Denegado';
        // Enviamos la petición a la API.
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
      const reclutador = JSON.parse(localStorage.getItem('user'));
      if (!reclutador) {
        alert("Error de autenticación.");
        return;
      }
      const messageData = {
        sender_id: reclutador.id,
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

    <!-- Filtro de Búsqueda -->
    <div class="mb-4">
      <!-- El filtro sigue funcionando igual, v-model actualiza filtroNombre
           y la computada 'candidatosFiltrados' reacciona automáticamente. -->
      <CandidatoFiltro v-model:filtro="filtroNombre" />
    </div>

    <!-- Tabla de Candidatos -->
    <div class="overflow-auto">
      <!-- Ahora la tabla se alimenta directamente de 'candidatosFiltrados' -->
      <CandidatoTabla
          :candidatos="candidatosFiltrados"
          @verMas="abrirModal"
          @contactar="abrirModalContacto"
      />
    </div>

    <!-- El botón "Ver más" se elimina, ya que ahora se muestran todos los candidatos por defecto.
         Si la lista de candidatos es muy larga, más adelante se podría implementar paginación,
         pero por ahora esto simplifica el flujo. -->

    <!-- Modal de Detalles -->
    <CandidatoModal
        v-if="mostrarModal"
        :candidato="modalData"
        @actualizar="actualizarEstado"
        @cerrar="cerrarModal"
    />

    <!-- Modal de Contacto -->
    <ContactarModal
        v-if="mostrarModalContacto"
        :candidato="candidatoParaContactar"
        @cerrar="cerrarModalContacto"
        @enviar="enviarMensaje"
    />
  </div>
</template>

<style scoped>
.preguntar-ia {
  background-color: #a2d45e;
  border: none;
  padding: 0.75rem 1.25rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.preguntar-ia:hover {
  background-color: #8bc34a;
}

.reclutador-candidatos {
  padding: 1.5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3e50;
}
</style>