<template>
  <div class="modal">
    <div class="modal-content">
      <h3>Candidatos</h3>

      <label class="modal-label">Nombre del Candidato</label>
      <input :value="candidato.name" type="text" class="modal-input" readonly />

      <label class="modal-label">Puesto al que postula</label>
      <input :value="candidato.publicationNumber" type="text" class="modal-input" readonly />

      <label class="modal-label">Curriculum Vitae</label>
      <div class="cv-container">
        <input :value="candidato.cv" type="text" class="modal-input" readonly />
        <a :href="candidato.cv" target="_blank" class="descargar-btn">Descargar</a>
      </div>

      <label class="modal-label">Estado del Postulante</label>
      <div class="estado-buttons">
        <button :class="{ 'estado-activo': candidato.status === 'Posible' }" @click="setEstado('Posible')">Posible</button>
        <button :class="{ 'estado-activo': candidato.status === 'Denegado' }" @click="setEstado('Denegado')">Denegado</button>
      </div>

      <button class="actualizar" @click="$emit('actualizar', candidato)">Actualizar Estado</button>
      <button class="cerrar" @click="$emit('cerrar')">Cerrar</button>
    </div>
  </div>
</template>

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

<style scoped>
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
}
</style>
