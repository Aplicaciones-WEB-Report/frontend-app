<script>
import {getTextPDF} from "../services/apiPDF.service.js";
import {resumenSimple, clasificarCV} from "../services/clasificarCV.service.js";

export default {
  name: "Result.component",

  data() {
    return {
      visible: false,
      linkPDF: '',
      resumen: '',
      estado: '',
      cargando: false,
      error: ''
    }
  },
  methods: {
    async analizarCV() {
      this.cargando = true;
      this.error = '';
      this.resumen = '';
      this.estado = '';

      try {
        console.log('Analizando PDF con link:', this.linkPDF);
        const texto = await getTextPDF(this.linkPDF);

        if (!texto || texto.trim().length < 20) {
          this.error = 'El PDF no contiene texto suficiente.';
          this.cargando = false;
          return;
        }

        this.resumen = resumenSimple(texto); // Aquí se resume antes de mostrar
        this.estado = clasificarCV(texto); // Clasifica el CV según el contenido
      } catch (e) {
        this.error = 'Error al analizar el CV: ' + e.message;
      }
      this.cargando = false;
    }
  }
}
</script>

<template>
  <button @click="visible = true" class="btn-analizar">Analizar</button>
  <div v-if="visible">
    <div class="modal-overlay" @click="visible = false"></div> <!-- Fondo opaco -->

    <div class="modal">
      <div class="modal-content">
        <h2>Analizar CV con AI</h2>

        <div class="input-group">
          <label for="linkPDF">Subir URL</label>
          <input v-model="linkPDF" placeholder="Pega la URL" class="input">
        </div>

        <div class="modal-actions">
          <button @click="visible = false" class="btn-cancel">Cancelar</button>
          <button @click="analizarCV" :disabled="cargando" class="btn-analizar">Analizar</button>
        </div>

        <div v-if="resumen && estado" class="resultado">
          <h3>Resumen:</h3>
          <p v-html="resumen"></p>
          <h3>Clasificación:</h3>
          <p><strong>{{ estado }}</strong></p>
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #C2EF7E;
  padding: 20px;
  border-radius: 10px;
  width: 25rem;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 999; /* Capa superior */
}
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5); /* Fondo oscuro con transparencia */
  backdrop-filter: blur(5px); /* Desenfoque suave */
  z-index: 998; /* Capa detrás del modal */
}


.modal-content h2 {
  text-align: center;
  margin-bottom: 15px;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
}

.input-group label {
  font-weight: bold;
}

.input {
  padding: 10px;
  border: 1px solid #285A84;
  border-radius: 5px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.btn-analizar {
  background: #285A84;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-analizar:hover {
  background: #1E496B;
}

.btn-cancel {
  background: #ccc;
  color: black;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-cancel:hover {
  background: #bbb;
}

</style>