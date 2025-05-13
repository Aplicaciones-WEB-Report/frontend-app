<script>
import { CandidatoService } from '../services/candidato.service.js';
import { Candidato } from '../model/Candidato.entity.js';

export default {
  name: 'Candidato',
  data() {
    return {
      filtroNombre: '',
      candidatos: [],
      mostrarTodosCandidatos: false
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
          Candidato.toDisplayableCandidato(
              new Candidato(c.name, c.publicationNumber, c.cv, c.posible)
          )
      );
    },
    mostrarTodos() {
      this.mostrarTodosCandidatos = true;
    },
    filtrarCandidatos() {
      this.mostrarTodosCandidatos = false;
    }
  },
  mounted() {
    this.cargarCandidatos();
  }
};
</script>

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
      <tr
          v-for="(candidato, index) in candidatosFiltradosMostrados"
          :key="index"
      >
        <td>{{ candidato.name }}</td>
        <td>{{ candidato.publicationNumber }}</td>
        <td>
          <a :href="candidato.cv" target="_blank">{{ candidato.cv }}</a>
        </td>
        <td>{{ candidato.status }}</td>
        <td><button class="ver-mas">Ver más</button></td>
      </tr>
      </tbody>
    </table>

    <div class="preguntar-ia-container">
      <button class="preguntar-ia" @click="mostrarTodos">Preguntar IA</button>
    </div>
  </div>
</template>

<style scoped>
.reclutador-candidatos {
  padding: 20px;
}

.search-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-filter input {
  padding: 8px;
  width: 300px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th {
  background-color: #a2d45e;
  color: white;
  padding: 10px;
  text-align: left;
}

td {
  padding: 10px;
  background-color: #f5f5f5;
}

.ver-mas {
  background-color: #204080;
  color: white;
  border: none;
  padding: 6px 12px;
  cursor: pointer;
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
}
</style>
