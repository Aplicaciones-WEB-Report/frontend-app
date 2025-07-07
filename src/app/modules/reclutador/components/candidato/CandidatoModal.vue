<script>
export default {
  name: 'CandidatoModal',
  props: {
    candidato: Object
  },
  methods: {
    setEstado(nuevo) {
      this.candidato.status = nuevo;
      this.candidato.posible = nuevo === 'Posible';
    }
  }
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h3>{{ $t("titulo_candidatos") }}</h3>

      <div class="mb-2">
        <label class="modal-label">{{ $t("nombre_candidato") }}</label>
        <input :value="candidato.name" type="text" class="modal-input w-full" readonly />
      </div>

      <div class="mb-2">
        <label class="modal-label">{{ $t("puesto_postula") }}</label>
        <input :value="candidato.publicationNumber" type="text" class="modal-input w-full" readonly />
      </div>

      <div class="mb-3">
        <label class="modal-label">{{ $t("curriculum_vitae") }}</label>
        <div class="cv-container flex flex-column sm:flex-row align-items-start sm:align-items-center gap-2 mt-1 mb-3">
          <input :value="candidato.cv" type="text" class="modal-input" readonly />
          <a :href="candidato.cv" target="_blank" class="descargar-btn">{{ $t("descargar") }}</a>
        </div>
      </div>

      <div class="mb-3">
        <label class="modal-label">{{ $t("estado_postulante") }}</label>
        <div class="estado-buttons flex flex-wrap gap-2 mt-1">
          <button :class="{ 'estado-activo': candidato.status === 'Posible' }" @click="setEstado('Posible')">{{ $t("posible") }}</button>
          <button :class="{ 'estado-activo': candidato.status === 'Denegado' }" @click="setEstado('Denegado')">{{ $t("denegado") }}</button>
        </div>
      </div>

      <div class="flex flex-column gap-3 mt-3">
        <button class="actualizar" @click="$emit('actualizar', candidato)">{{ $t("actualizar_estado") }}</button>
        <button class="cerrar" @click="$emit('cerrar')">{{ $t("cerrar") }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: flex-start; /* mostrar el modal más abajo */
  justify-content: center;
  padding-top: 70px; /* espacio debajo del botón hamburguesa */
  z-index: 1000;
  overflow-y: auto;
  box-sizing: border-box;
}

.modal-content {
  background: white;
  padding: 24px;
  width: 92vw;
  max-width: 500px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
}

.modal-label {
  font-weight: 600;
  font-size: 14px;
  color: #2d3e50;
  margin-bottom: 6px;
}

.modal-input {
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #ccc;
  background-color: #eaf0f6;
  font-size: 15px;
  width: 100%;
  box-sizing: border-box;
}

.cv-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

@media (min-width: 640px) {
  .cv-container {
    flex-direction: row;
    align-items: center;
  }
}

.descargar-btn {
  background-color: #204080;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;
}

.estado-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
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

.actualizar,
.cerrar {
  background-color: #204080;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
  width: 100%;
}
</style>