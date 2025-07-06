<script>
import {
  getAllPublications,
  deletePublication,
  addPublication,
  updatePublication
} from "../services/Publication.service.js";
import { Publication } from "../model/Publication.entity.js";

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
      formulario: new Publication(),
      paginaActual: 1,
      publicacionesPorPagina: 5,
    };
  },
  computed: {
    publicacionesFiltradas() {
      if (!this.filtroTitulo) {
        return this.publicaciones;
      }
      return this.publicaciones.filter(pub =>
          pub.title.toLowerCase().includes(this.filtroTitulo.toLowerCase())
      );
    },
    publicacionesPaginadas() {
      const inicio = (this.paginaActual - 1) * this.publicacionesPorPagina;
      const fin = inicio + this.publicacionesPorPagina;
      return this.publicacionesFiltradas.slice(inicio, fin);
    },
    totalPaginas() {
      return Math.ceil(this.publicacionesFiltradas.length / this.publicacionesPorPagina);
    },
  },
  methods: {
    async cargarPublicaciones() {
      try {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');

        if (!currentUser || !token) {
          console.error("Usuario no autenticado.");
          return;
        }

        const response = await getAllPublications(currentUser.id, token);
        this.publicaciones = response.data;
      } catch (error) {
        console.error("Error al cargar publicaciones:", error);
      }
    },
    async guardarPublicacion() {
      try {
        const currentUser = JSON.parse(localStorage.getItem('user'));
        if (!currentUser) {
          alert("Error de autenticación. Por favor, inicia sesión de nuevo.");
          return;
        }

        if (this.formulario.id) {
          const response = await updatePublication(this.formulario.id, this.formulario);
          alert('¡Publicación actualizada exitosamente!');
        } else {
          const payload = {
            ...this.formulario,
            employer_id: currentUser.id
          };
          delete payload.id;
          const response = await addPublication(payload);
          alert('¡Publicación creada exitosamente!');
        }
        this.cerrarModalEditar();
        this.cargarPublicaciones(); // Recargar para ver los cambios
      } catch (error) {
        alert('Error al guardar la publicación.');
        console.error('Detalle del error:', error);
      }
    },
    async eliminarPublicacionConfirmada() {
      if (!this.publicacionSeleccionada || !this.publicacionSeleccionada.id) return;
      try {
        await deletePublication(this.publicacionSeleccionada.id);
        this.modalEliminar = false;
        alert("Publicación eliminada exitosamente.");
        this.cargarPublicaciones();
      } catch (error) {
        alert("Error al eliminar la publicación.");
        console.error(error);
      }
    },
    abrirModalVer(publicacion) {
      this.publicacionSeleccionada = publicacion;
      this.modalVer = true;
    },
    abrirModalEditar(publicacion) {
      this.formulario = { ...publicacion };
      this.modalEditar = true;
    },
    abrirModalEliminar(publicacion) {
      this.publicacionSeleccionada = publicacion;
      this.modalEliminar = true;
    },
    abrirModalNuevaPublicacion() {
      this.formulario = new Publication({ status: 'Activa' });
      this.modalEditar = true;
    },
    cerrarModalEditar() {
      this.modalEditar = false;
    },
    cambiarPagina(nuevaPagina) {
      if (nuevaPagina >= 1 && nuevaPagina <= this.totalPaginas) {
        this.paginaActual = nuevaPagina;
      }
    },
  },
  mounted() {
    this.cargarPublicaciones();
  }
};
</script>


<template>
  <div class="reclutador-publicaciones">
    <h2>{{ $t("publicaciones") }}</h2>

    <div class="top-controls">
      <div class="search-filter">
        <input
            v-model="filtroTitulo"
            type="text"
            :placeholder="$t('buscar_por_titulo')"
        />
      </div>
    </div>

    <div class="publication-grid">
      <div class="header-cell">{{ $t("columna_titulo") }}</div>
      <div class="header-cell">{{ $t("columna_estado") }}</div>
      <div class="header-cell">{{ $t("columna_aplicaciones") }}</div>
      <div class="header-cell">{{ $t("columna_acciones") }}</div>

      <template v-if="publicacionesPaginadas.length > 0">
        <template v-for="publicacion in publicacionesPaginadas" :key="publicacion.id">
          <div class="data-cell" :data-label="$t('columna_titulo')">{{ publicacion.title }}</div>
          <div class="data-cell" :data-label="$t('columna_estado')">
            <span :class="['status-badge', publicacion.status === 'Activa' ? 'status-active' : 'status-draft']">
              {{ publicacion.status }}
            </span>
          </div>
          <div class="data-cell" :data-label="$t('columna_aplicaciones')">{{ publicacion.applicationCount }}</div>
          <div class="data-cell" :data-label="$t('columna_acciones')">
            <div class="acciones">
              <button class="ver" @click="abrirModalVer(publicacion)">{{ $t("accion_ver") }}</button>
              <button class="editar" @click="abrirModalEditar(publicacion)">{{ $t("accion_editar") }}</button>
              <button class="eliminar" @click="abrirModalEliminar(publicacion)">{{ $t("accion_eliminar") }}</button>
            </div>
          </div>
        </template>
      </template>
      <div v-else class="no-data-cell">
        {{ $t("no_publicaciones_para_mostrar") }}
      </div>
    </div>

    <div class="pagination" v-if="totalPaginas > 1">
      <button @click="cambiarPagina(paginaActual - 1)" :disabled="paginaActual === 1">{{ $t("anterior") }}</button>
      <button
          v-for="n in totalPaginas"
          :key="n"
          :class="{ activa: paginaActual === n }"
          @click="cambiarPagina(n)"
      >{{ n }}</button>
      <button @click="cambiarPagina(paginaActual + 1)" :disabled="paginaActual === totalPaginas">{{ $t("siguiente") }}</button>
    </div>
    <div class="button-new-publication">
      <button class="new-publication" @click="abrirModalNuevaPublicacion">{{ $t("nueva_publicacion") }}</button>
    </div>
    <div v-if="modalVer" class="modal">
      <div class="modal-content">
        <h3>{{ $t("detalle_publicacion") }}</h3>
        <p><strong>{{ $t("titulo") }}:</strong> {{ publicacionSeleccionada.title }}</p>
        <p><strong>{{ $t("descripcion") }}:</strong> {{ publicacionSeleccionada.description }}</p>
        <p><strong>{{ $t("requisitos") }}:</strong> {{ publicacionSeleccionada.requirements }}</p>
        <p><strong>{{ $t("ubicacion") }}:</strong> {{ publicacionSeleccionada.location }}</p>
        <p><strong>{{ $t("salario") }}:</strong> {{ publicacionSeleccionada.salary_range }}</p>
        <p><strong>{{ $t("estado") }}:</strong> {{ publicacionSeleccionada.status }}</p>
        <button @click="modalVer = false">{{ $t("cerrar") }}</button>
      </div>
    </div>

    <div v-if="modalEliminar" class="modal">
      <div class="modal-content">
        <h3>{{ $t("confirmar_eliminar_titulo") }}</h3>
        <p>{{ $t("confirmar_eliminar_texto") }}</p>
        <p><strong>{{ $t("titulo") }}:</strong> {{ publicacionSeleccionada.title }}</p>
        <div class="modal-buttons">
          <button class="confirm-delete" @click="eliminarPublicacionConfirmada">{{ $t("confirmar") }}</button>
          <button @click="modalEliminar = false">{{ $t("cancelar") }}</button>
        </div>
      </div>
    </div>

    <div v-if="modalEditar" class="modal">
      <div class="modal-content">
        <h3>{{ formulario.id ? $t("editar_publicacion") : $t("nueva_publicacion") }}</h3>
        <form @submit.prevent="guardarPublicacion">
          <label>{{ $t("titulo_puesto") }}</label>
          <input v-model="formulario.title" type="text" required />

          <label>{{ $t("descripcion") }}</label>
          <textarea v-model="formulario.description" rows="4"></textarea>

          <label>{{ $t("requisitos") }}</label>
          <textarea v-model="formulario.requirements" rows="4"></textarea>

          <label>{{ $t("ubicacion") }}</label>
          <input v-model="formulario.location" type="text" />

          <label>{{ $t("rango_salarial") }}</label>
          <input v-model="formulario.salary_range" type="text" />

          <label>{{ $t("estado") }}</label>
          <select v-model="formulario.status">
            <option value="Activa">{{ $t("activa") }}</option>
            <option value="Borrador">{{ $t("borrador") }}</option>
          </select>

          <div class="modal-buttons">
            <button type="submit">{{ $t("guardar") }}</button>
            <button type="button" @click="cerrarModalEditar">{{ $t("cancelar") }}</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.reclutador-publicaciones {
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 1200px;
  margin: auto;
}

h2 {
  color: #333;
  margin-bottom: 1.5rem;
}

.top-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.search-filter input {
  padding: 0.75rem;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.new-publication {
  background-color: #4364ab;
  color: white;
  padding: 12px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  font-weight: 600;
  margin-top: 3rem;
  gap: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 200px;
  margin-left: auto;
}
.new-publication:hover {
  background-color: #218588;
}

.publication-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.header-cell, .data-cell {
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.header-cell {
  background-color: #b6e3a9;
  color: #004d40;
  font-weight: 600;
}
.header-cell:first-child {
  background-color: #c8e6c9;
}

.data-cell {
  background-color: #f8f9fa;
  border: 1px solid #e9ecef;
}

.no-data-cell {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.status-badge {
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 0.9rem;
  font-weight: 500;
  color: white;
  min-width: 80px;
}
.status-active {
  background-color: #28a745;
}
.status-draft {
  background-color: #6c757d;
}

.acciones {
  gap: 8px;
}
.acciones button {
  margin-right: 5px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
  color: white;
}
.acciones button:hover {
  opacity: 0.8;
}
.ver { background-color: #2e629a; }
.editar { background-color: #78c701; color: #1f2921; }
.eliminar { background-color: #626262; }

/* MODAL STYLES */
.modal {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  position: relative;
  animation: fadeIn 0.3s ease;
}
.modal-content h3 {
  color: #d9534f;
  text-align: center;
  margin-bottom: 1rem;
}
.modal-content p {
  text-align: center;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.4;
}
.modal-buttons {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 1.5rem;
}
.modal-buttons .confirm-delete {
  background-color: #d9534f;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}
.modal-buttons .confirm-delete:hover {
  background-color: #c9302c;
}
.modal-buttons button:not(.confirm-delete) {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.modal-buttons button:not(.confirm-delete):hover {
  background-color: #5a6268;
}

form {
  display: flex;
  flex-direction: column;
}
form label {
  margin-bottom: 0.3rem;
  font-weight: 600;
  color: #333;
}
form input,
form select,
form textarea {
  padding: 0.8rem;
  margin-bottom: 1rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  width: 100%;
  font-size: 0.95rem;
  transition: border-color 0.2s ease;
}
form input:focus,
form select:focus,
form textarea:focus {
  border-color: #4364ab;
  outline: none;
}
.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 1rem;
}
.modal-buttons button[type="submit"] {
  background-color: #78c701;
  color: #1f2921;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
}
.modal-buttons button[type="submit"]:hover {
  background-color: #5fa300;
}
.modal-buttons button[type="button"] {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}
.modal-buttons button[type="button"]:hover {
  background-color: #5a6268;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 8px;
}
.pagination button {
  padding: 8px 14px;
  border: 1px solid #dee2e6;
  background-color: white;
  cursor: pointer;
  border-radius: 6px;
}
.pagination button.activa {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}
.pagination button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* ✅ Responsive Mobile */
@media (max-width: 768px) {
  .publication-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 0.5rem;
  }

  .header-cell {
    display: none;
  }

  .data-cell {
    display: block;
    width: 100%;
    padding: 1rem;
    border-radius: 12px;
    background-color: #f8f9fa;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    position: relative;
  }

  .data-cell::before {
    content: attr(data-label);
    display: block;
    font-weight: 600;
    color: #004d40;
    margin-bottom: 0.5rem;
    font-size: 0.95rem;
  }

  .acciones {
    display: flex !important;
    flex-direction: row !important;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }

  .acciones button {
    flex: 1 1 auto;
    font-size: 0.85rem;
    padding: 8px 10px;
    white-space: nowrap;
  }

  .top-controls {
    flex-direction: column;
    align-items: flex-start;
  }

  .search-filter input {
    width: 100%;
  }

  .new-publication {
    width: 100%;
    margin-left: 0;
    max-width: none;
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>

