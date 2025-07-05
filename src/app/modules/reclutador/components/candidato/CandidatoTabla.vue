<script>
export default {
  name: 'CandidatoTabla',
  props: {
    candidatos: {
      type: Array,
      required: true
    }
  },
  emits: ['verMas', 'contactar']
};
</script>

<template>
  <div class="candidato-table-container">
    <div class="table-grid">
      <!-- Encabezados de la Tabla -->
      <div class="table-header">Nombre</div>
      <div class="table-header">Nro° Publicación</div>
      <div class="table-header">Curriculum Vitae</div>
      <div class="table-header">Estado</div>
      <div class="table-header">Acciones</div>

      <!-- Filas de Datos -->
      <template v-if="candidatos.length > 0">
        <template v-for="candidato in candidatos" :key="candidato.id">
          <div class="table-cell" :data-label="'Nombre'">{{ candidato.name }}</div>
          <div class="table-cell" :data-label="'Nro° Publicación'">{{ candidato.publicationNumber }}</div>

          <!-- Celda del CV con lógica condicional -->
          <div class="table-cell" :data-label="'Curriculum Vitae'">
            <a v-if="candidato.cv" :href="candidato.cv" target="_blank" rel="noopener noreferrer" class="cv-link">
              Ver CV
            </a>
            <span v-else class="no-cv">No proporcionado</span>
          </div>

          <div class="table-cell" :data-label="'Estado'">{{ candidato.status }}</div>

          <div class="table-cell actions-cell" :data-label="'Acciones'">
            <button @click="$emit('verMas', candidato)" class="action-btn details-btn">Detalles</button>
            <button @click="$emit('contactar', candidato)" class="action-btn contact-btn">Contactar</button>
          </div>
        </template>
      </template>

      <div v-else class="no-data-row">
        No hay candidatos para mostrar.
      </div>
    </div>
  </div>
</template>

<style scoped>
.candidato-table-container {
  width: 100%;
}

.table-grid {
  display: grid;
  grid-template-columns: 2fr 2fr 1.5fr 1fr 1.5fr; /* Columnas con proporciones */
  gap: 1rem;
}

.table-header {
  background-color: #A8D589;
  color: #3E721D;
  font-weight: 600;
  padding: 1rem;
  text-align: center;
  border-radius: 8px;
}

.table-cell {
  background-color: #ffffff;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
}

.cv-link {
  color: #3B5998;
  text-decoration: none;
  font-weight: 600;
}
.cv-link:hover {
  text-decoration: underline;
}

.no-cv {
  color: #999;
  font-style: italic;
}

.actions-cell {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

.action-btn {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: transform 0.2s;
}
.action-btn:hover {
  transform: translateY(-2px);
}

.details-btn {
  background-color: #3B5998;
  color: white;
}

.contact-btn {
  background-color: #f0f0f0;
  color: #333;
}

.no-data-row {
  grid-column: 1 / -1; /* Ocupa todas las columnas */
  text-align: center;
  padding: 3rem;
  color: #888;
  background-color: #f8f9fa;
  border-radius: 8px;
}

/* --- Responsividad para móvil --- */
@media (max-width: 768px) {
  .table-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .table-header {
    display: none;
  }
  .table-cell {
    display: flex;
    justify-content: space-between;
    padding: 0.8rem 1rem;
    border-bottom: 1px solid #eee;
  }
  .table-cell::before {
    content: attr(data-label);
    font-weight: 600;
    color: #333;
    padding-right: 1rem;
  }
}
</style>