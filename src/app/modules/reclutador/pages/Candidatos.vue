<template>
  <div class="reclutador-candidatos">
    <h2>Candidatos</h2>

    <div class="search-filter">
      <input
          v-model="filtroNombre"
          type="text"
          placeholder="Buscar por nombre..."
      />
      <button @click="filtrarCandidatos">Filtrar</button>
    </div>

    <table>
      <thead>
      <tr>
        <th>Nombre</th>
        <th>Nro° Publicación</th>
        <th>Curriculum Vitae</th>
        <th>Estado</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(candidato, index) in candidatosFiltradosMostrados" :key="index">
        <td>{{ candidato.name }}</td>
        <td>{{ candidato.publicationNumber }}</td>
        <td><a :href="candidato.cv" target="_blank">{{ candidato.cv }}</a></td>
        <td>{{ candidato.status }}</td>
        <td><button class="ver-mas" @click="abrirModal(candidato)">Ver más</button></td>
      </tr>
      </tbody>
    </table>

    <div class="preguntar-ia-container">
      <button class="preguntar-ia" @click="mostrarTodos">Preguntar IA</button>
    </div>

    <div v-if="mostrarModal" class="modal">
      <div class="modal-content">
        <h3>Candidatos</h3>

        <label class="modal-label">Nombre del Candidato</label>
        <input :value="modalData.name" type="text" class="modal-input" readonly />

        <label class="modal-label">Puesto al que postula</label>
        <input :value="modalData.publicationNumber" type="text" class="modal-input" readonly />

        <label class="modal-label">Curriculum Vitae</label>
        <div class="cv-container">
          <input :value="modalData.cv" type="text" class="modal-input" readonly />
          <a :href="modalData.cv" target="_blank" class="descargar-btn">Descargar</a>
        </div>

        <label class="modal-label">Estado del Postulante</label>
        <div class="estado-buttons">
          <button :class="{'estado-activo': modalData.status === 'Posible'}" @click="cambiarEstado('Posible')">Posible</button>
          <button :class="{'estado-activo': modalData.status === 'Denegado'}" @click="cambiarEstado('Denegado')">Denegado</button>
        </div>

        <button class="actualizar" @click="actualizarEstado">Actualizar Estado</button>
        <button class="cerrar" @click="cerrarModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { CandidatoService } from '../services/candidato.service.js';
import { Candidato } from '../model/Candidato.entity.js';

export default {
  name: 'Candidato',
  data() {
    return {
      filtroNombre: '',
      candidatos: [],
      mostrarTodosCandidatos: false,
      mostrarModal: false,
      modalData: {}
    };
  },
  computed: {
    candidatosFiltrados() {
      if (!this.filtroNombre) return this.candidatos;
      return this.candidatos.filter(c =>
          c.name.toLowerCase().includes(this.filtroNombre.toLowerCase())
      );
    },
    candidatosFiltradosMostrados() {
      return this.mostrarTodosCandidatos
          ? this.candidatosFiltrados
          : this.candidatosFiltrados.slice(0, 1);
    }
  },
  methods: {
    async cargarCandidatos() {
      const datos = await CandidatoService.obtenerCandidatos();
      this.candidatos = datos.map(c =>
          Candidato.toDisplayableCandidato(new Candidato(c.id, c.name, c.publicationNumber, c.cv, c.posible))
      );
    },
    mostrarTodos() {
      this.mostrarTodosCandidatos = true;
    },
    filtrarCandidatos() {
      this.mostrarTodosCandidatos = false;
    },
    abrirModal(candidato) {
      this.modalData = { ...candidato };
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    cambiarEstado(nuevoEstado) {
      this.modalData.status = nuevoEstado;
      this.modalData.posible = nuevoEstado === 'Posible';
    },
    async actualizarEstado() {
      const index = this.candidatos.findIndex(c => c.id === this.modalData.id);
      if (index !== -1) {
        this.candidatos[index] = { ...this.modalData };
        await CandidatoService.actualizarCandidato(this.modalData);
      }
      this.cerrarModal();
    }
  },
  mounted() {
    this.cargarCandidatos();
  }
};
</script>

<style scoped>
.reclutador-candidatos {
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2d3e50;
}

.search-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-filter input {
  padding: 8px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 14px;
}

th {
  background-color: #a2d45e;
  color: white;
  padding: 10px;
  text-align: left;
  border-radius: 4px 4px 0 0;
}

td {
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.ver-mas {
  background-color: #204080;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}

.preguntar-ia-container {
  display: flex;
  justify-content: center;
}

.preguntar-ia {
  background-color: #a2d45e;
  border: none;
  padding: 10px 20px;
  font-weight: bold;
  cursor: pointer;
  border-radius: 10px;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 30px;
  width: 500px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.modal-label {
  font-weight: 600;
  font-size: 14px;
  color: #2d3e50;
}

.modal-input {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  background-color: #eaf0f6;
  font-size: 15px;
}

.cv-container {
  display: flex;
  gap: 10px;
  align-items: center;
}

.descargar-btn {
  background-color: #204080;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}

.estado-buttons {
  display: flex;
  gap: 10px;
}

.estado-buttons button {
  background-color: #ccc;
  border: none;
  border-radius: 12px;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: 500;
  font-size: 14px;
}

.estado-activo {
  background-color: #a2d45e !important;
  color: white;
  font-weight: bold;
}

.actualizar, .cerrar {
  background-color: #204080;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
}
</style>
