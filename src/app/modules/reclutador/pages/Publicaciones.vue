<template>
<div class="reclutador-publicaciones">
  <h2>Publicaciones</h2>

  <div class="search-filter">
    <input
        v-model="filtroTitulo"
        type="text"
        placeholder="Buscar por titulo..."
    />
    <button @click="filtrarPublicaciones">Filtrar</button>
</div>
  <table>
    <thead>
    <tr>
      <th>Titulo</th>
      <th>Estado</th>
      <th>Aplicaciones</th>
      <th>Acciones</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for ="(publicacion, index) in publicacionesFiltradasMostradas" :key="index">
      <td>{{ publicacion.titulo }}</td>
      <td>{{ publicacion.estado }}</td>
      <td>{{ publicacion.aplicaciones }}</td>
      <td>
        <button class="ver" @click="abrirModalV(publicacion)">Ver </button>
        <button class="editar" @click="abrirModalEd(publicacion)">Editar</button>
        <button class="Eliminar" @click="abrirModalEl(publicacion)">Eliminar</button>
      </td>
    </tr>
    </tbody>
  </table>
  <div class="paginacion">
    <button @click="cambiarPagina(paginaActual - 1)" :disabled="paginaActual === 1">Anterior</button>

    <button
        v-for="n in paginasVisibles"
        :key="n"
        :class="{ activa: paginaActual === n }"
        @click="cambiarPagina(n)"
    >{{ n }}</button>

    <button @click="cambiarPagina(paginaActual + 1)" :disabled="paginaActual === totalPaginas">Siguiente</button>
  </div>




  <div class="button-new-publication">
    <button class="new-publication" @click="abrirModalNuevaPublicacion">Nueva Publicación</button>
  </div>

  <!-- Modal Ver -->
  <div v-if="modalVer" class="modal">
    <div class="modal-content">
      <h3>Detalle de Publicación</h3>
      <p><strong>Puesto de Trabajo - Título:</strong> {{ publicacionSeleccionada.titulo }}</p>
      <p><strong>Descripcion:</strong> {{ publicacionSeleccionada.descripcion}}</p>
      <p><strong>Requisitos:</strong> {{ publicacionSeleccionada.requirements }}</p>
      <p><strong>Requerimiento:</strong> {{ publicacionSeleccionada.requirements }}</p>
      <p><strong>Propuesta Economica:</strong> {{ publicacionSeleccionada.salary_range }}</p>
      <p>Estado de la Publicacion</p>
      <button @click="modalStatus = false">Activo {{ publicacionSeleccionada.estado }}</button>
      <button @click="modalStatus = false">Borrador {{ publicacionSeleccionada.estado }}</button>
      <button @click="modalVer = false">Cerrar</button>
    </div>
  </div>

  <!-- Modal Eliminar -->
  <div v-if="modalEliminar" class="modal">
    <div class="modal-content">
      <h3>¿Esta seguro de eliminar esta publicacion?</h3>
      <p>Cuando se elimine, se borrara todos los datos y no podra recuperarla despues.</p>
      <p>Título: {{ publicacionSeleccionada.titulo }}</p>
      <button @click="eliminarPublicacionConfirmada">Sí, eliminar</button>
      <button @click="modalEliminar = false">Cancelar</button>
    </div>
  </div>

  <!-- MODAL DE CREAR / EDITAR PUBLICACIÓN -->
  <div v-if="modalEditar" class="modal">
    <div class="modal-content">
      <h3>{{ publicacionSeleccionada ? 'Editar' : 'Nueva' }} Publicación</h3>

      <form @submit.prevent="guardarPublicacion">
        <label>Puesto de  Trabajo - Titulo</label>
        <input v-model="formulario.titulo" type="text" required />


        <label>Descripción del Trabajo:</label>
        <textarea v-model="formulario.descripcion"></textarea>

        <label>Requisitos:</label>
        <textarea v-model="formulario.requirements"></textarea>

        <label>Requisitos:</label>
        <textarea v-model="formulario.requirements"></textarea>

        <label>Propuesta Economica:</label>
        <textarea v-model="formulario.salary_range"></textarea>


        <p>Estado de la Publicacion</p>
        <button @click="modalStatus = false">Activo {{ publicacionSeleccionada.estado }}</button>
        <button @click="modalStatus = false">Borrador {{ publicacionSeleccionada.estado }}</button>

        <div class="modal-buttons">
          <button type="submit">Guardar</button>
          <button type="button" @click="cerrarModalEditar">Cancelar</button>
        </div>
      </form>
    </div>
  </div>


</div>
</template>



<script>
import {
  getAllPublications,
  deletePublication,
  addPublication,
  updatePublication
} from "../services/Publication.service.js";
import {Publication} from "../model/Publication.entity.js";
export default {
  name: "Publicaciones",
  data() {
    return {
      publicaciones: [],
      filtroTitulo: '',
      modalVer: false,
      modalEditar: false,
      modalEliminar: false,
      publicacionSeleccionada: null,
      titulo: '',
      estado: 'Abierta',
      descripcion: '',

      formulario: {},
      paginaActual: 1,
      publicacionesPorPagina: 5,
    };
  },
  computed: {
    Publication() {
      return Publication
    },
    publicacionesFiltradas() {
      if (!this.filtroTitulo) return this.publicaciones;
      return this.publicaciones.filter(pub =>
          pub.titulo.toLowerCase().includes(this.filtroTitulo.toLowerCase())
      );
    },
    publicacionesFiltradasMostradas() {
      const inicio = (this.paginaActual - 1) * this.publicacionesPorPagina;
      const fin = inicio + this.publicacionesPorPagina;
      return this.publicacionesFiltradas.slice(inicio, fin);
    },
    totalPaginas() {
      return Math.ceil(this.publicacionesFiltradas.length / this.publicacionesPorPagina);
    },
    paginasVisibles() {
      const total = this.totalPaginas;
      const actual = this.paginaActual;
      let inicio = Math.max(actual - 2, 1);
      let fin = Math.min(inicio + 4, total);

      if (fin - inicio < 4) {
        inicio = Math.max(fin - 4, 1);
      }

      const paginas = [];
      for (let i = inicio; i <= fin; i++) {
        paginas.push(i);
      }
      return paginas;
    }
  },

  methods: {
    async cargarPublicaciones() {
      const res = await getAllPublications();
      this.publicaciones = res.data;
    },
    cerrarModalEditar() {
      this.modalEditar = false;
    },
    async guardarPublicacion() {
      try {
        if (this.publicacionSeleccionada) {
          await updatePublication(this.publicacionSeleccionada.id, this.formulario);
          alert('¡Publicación actualizada exitosamente!');
        } else {
          await addPublication(this.formulario);
          alert('¡Publicación creada exitosamente!');
        }
        this.modalEditar = false;
        await this.cargarPublicaciones();
      } catch (error) {
        alert('Error al guardar la publicación.');
        console.error(error);
      }
    },
    cambiarPagina(nuevaPagina) {
      if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
        this.paginaActual = nuevaPagina;
      }
    },
    abrirModalV(publicacion) {
      this.publicacionSeleccionada = publicacion;
      this.modalVer = true;
    },
    abrirModalEd(publicacion) {
      this.publicacionSeleccionada = publicacion;
      this.formulario = {
        titulo: publicacion.titulo,
        estado: publicacion.estado,
        descripcion: publicacion.descripcion
      };
      this.modalEditar = true;
    },
    abrirModalEl(publicacion) {
      this.publicacionSeleccionada = publicacion;
      this.modalEliminar = true;
    },
    async eliminarPublicacionConfirmada() {
      try {
        await deletePublication(this.publicacionSeleccionada.id);
        this.modalEliminar = false;
        await this.cargarPublicaciones();
        alert("Publicación eliminada exitosamente.");
      } catch (error) {
        alert("Error al eliminar la publicación.");
        console.error(error);
      }
    },

    abrirModalNuevaPublicacion() {
      this.publicacionSeleccionada = null;
      this.formulario = {
        titulo: '',
        estado: 'Abierta',
        descripcion: ''
      };
      this.modalEditar = true;
    },
    filtrarPublicaciones() {
      // Ya se aplica con v-model + computed
    },


  },
  mounted() {
    this.cargarPublicaciones();
  }
};
</script>



<style scoped>
.reclutador-publicaciones {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.search-filter {
  margin-bottom: 15px;
}

.search-filter input {
  padding: 8px;
  width: 250px;
  margin-right: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 15px;
}

th, td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: left;
}

th {
  background-color: #f4f4f4;
}

button {
  padding: 6px 12px;
  margin: 0 3px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button.ver {
  background-color: #3498db;
  color: white;
}

button.editar {
  background-color: #2ea40e;
  color: white;
}

button.Eliminar {
  background-color: #808080;
  color: white;
}

.button-new-publication {
  text-align: right;
  margin-top: 20px;
  margin-bottom: 20px;

}

.new-publication {
  background-color: #2ecc71;
  color: white;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: black;
  padding: 25px;
  border-radius: 10px;
  min-width: 300px;
}
form {
  display: flex;
  flex-direction: column;
}

form label {
  margin-top: 10px;
  font-weight: bold;
}

form input, form select, form textarea {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th, td {
  border: 8px solid white;
  padding: 8px;
  text-align: center;
}

th {
  background-color: #8ce397;
}
td{
  background-color: #eaeaea;
}

.ver, .editar, .Eliminar{
  margin: 0 4px;
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  border-radius: 13px;
  font-weight: bold;
}
 .new-publication {
   margin-top: 1rem;
   padding: 6px 12px;
   border: none;
   cursor: pointer;
   border-radius: 8px;
   font-weight: bold;
   justify-content: center;
 }

  .ver { background-color: #2196F3; color: white; }
.editar { background-color: #FFC107; color: black; }
.Eliminar { background-color: #f44336; color: white; }
.new-publication { background-color: #2196F3; color: white; margin-top: 1rem; }

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
}

.modal-content h3 {
  margin-bottom: 1rem;
}

.modal-content label {
  display: block;
  margin: 8px 0 4px;
}

.modal-content input,
.modal-content textarea,
.modal-content select {
  width: 100%;
  padding: 6px;
  margin-bottom: 10px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.paginacion {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 5px;
}

.paginacion button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  background-color: white;
  cursor: pointer;
  border-radius: 4px;
}

.paginacion button.activa {
  background-color: #3498db;
  color: white;
  font-weight: bold;
}

.paginacion button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

</style>