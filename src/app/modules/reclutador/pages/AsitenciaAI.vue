<script>
import axios from 'axios'
import { PlusIcon } from 'lucide-vue-next'

export default {
  name: "AsitenciaAI",
  components: {
    PlusIcon
  },
  data() {
    return {
      file: null,
      objective: '',
      response: '',
      loading: false
    }
  },
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0]
    },
    async sendMessage() {
      this.loading = true
      this.response = ''

      try {
        const formData = new FormData()
        if (this.file) formData.append('file', this.file)

        const query = new URLSearchParams({ objective: this.objective }).toString()

        const { data } = await axios.post(
            `http://localhost:5195/api/document/analyze-pdf?${query}`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } }
        )

        this.response = data.result
      } catch (err) {
        console.error(err)
        this.response = 'Ocurrió un error al procesar el documento.'
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <div class="chat-container">
    <div class="chat-content">
      <!-- Título -->
      <h2 class="title">
        💬 Chat con Jobsy AI
      </h2>

      <!-- Contenedor del formulario de envío -->
      <div class="input-area">
        <!-- Input de archivo -->
        <label for="file-upload" class="file-label" title="Adjuntar PDF">
          <PlusIcon class="plus-icon" />
          <span v-if="file" class="file-name">Archivo: {{ file.name }}</span>
          <input id="file-upload" type="file" accept="application/pdf" @change="onFileChange" />
        </label>

        <!-- Input de texto -->
        <input
            v-model="objective"
            placeholder="Escribe tu mensaje..."
            class="text-input"
        />

        <!-- Botón de envío -->
        <button
            @click="sendMessage"
            :disabled="loading || (!file && !objective)"
            class="send-button"
        >
          Enviar
        </button>
      </div>

      <!-- Loader de carga -->
      <div v-if="loading" class="loader-overlay">
        <div class="spinner"></div>
        <p class="loader-text">Analizando...</p>
      </div>
    </div>

    <!-- Contenedor de la respuesta -->
    <div v-if="response" class="response-ai">
      <h4>Respuesta de la IA:</h4>
      <p>{{ response }}</p>
    </div>
  </div>
</template>

<style scoped>
/* Contenedor principal del chat */
.chat-container {
  font-family: 'Segoe UI', sans-serif;
  background-color: #F0FFF4;
  border-radius: 20px;
  border: 1px solid #A0D9B4;
  box-shadow: 0 6px 16px rgba(72, 187, 120, 0.2);
  padding: 1.5rem;
  margin: 2rem auto;
  max-width: 90%;
  width: 100%;
}

.chat-content {
  max-width: 48rem; /* Equivalente a max-w-3xl */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.title {
  font-size: 1.5rem; /* text-2xl */
  font-weight: 700;
  color: #2D3748; /* text-gray-800 */
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

/* Área de inputs y botón */
.input-area {
  display: flex;
  flex-direction: column; /* Apilado en móvil por defecto */
  gap: 0.75rem;
}

.file-label {
  position: relative;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.plus-icon {
  color: #2F855A; /* text-green-700 */
  transition: all 0.2s ease;
  border-radius: 9999px;
  padding: 0.25rem;
  width: 1.5rem;
  height: 1.5rem;
}

.plus-icon:hover {
  background-color: rgba(16, 185, 129, 0.1);
  transform: scale(1.05);
}

.file-name {
  font-size: 0.875rem;
  color: #2F855A;
  margin-top: 2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 150px;
}

/* Ocultar el input de archivo real */
#file-upload {
  display: none;
}

.text-input {
  width: 100%;
  flex: 1;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  border-radius: 9999px;
  background-color: white;
  color: #4A5568;
  border: 1px solid #CBD5E0;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.text-input:focus {
  outline: none;
  border-color: #68D391; /* focus:ring-green-400 */
  box-shadow: 0 0 0 3px rgba(104, 211, 145, 0.3);
}

.send-button {
  padding: 0.5rem 1.25rem;
  background-color: #38A169; /* bg-green-600 */
  color: white; /* Cambiado a blanco para mejor contraste */
  font-size: 0.875rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

.send-button:hover:enabled {
  background-color: #2F855A; /* hover:bg-green-700 */
  transform: translateY(-1px);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Loader */
.loader-overlay {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.4);
  z-index: 50;
}

.spinner {
  width: 2rem;
  height: 2rem;
  border: 4px solid #68D391; /* border-green-400 */
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loader-text {
  margin-top: 0.75rem;
  font-size: 0.875rem;
  color: #4A5568;
}

/* Respuesta de la IA */
.response-ai {
  margin-top: 1.5rem;
  background-color: #F0FFF4;
  border-radius: 16px;
  border: 1px solid #9AE6B4;
  box-shadow: 0 4px 10px rgba(72, 187, 120, 0.1);
  padding: 1.25rem;
  color: #2F855A;
}

.response-ai h4 {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.response-ai p {
  white-space: pre-wrap;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* --- Media Query para hacerla Responsive --- */
/* sm: y mayores (desde 640px en adelante) */
@media (min-width: 640px) {
  .input-area {
    flex-direction: row; /* Elementos en fila */
    align-items: center;
  }

  .file-label {
    align-self: auto;
  }

  .chat-container {
    font-family: 'Segoe UI', sans-serif;
    background-color: #F0FFF4;
    border-radius: 20px;
    border: 1px solid #A0D9B4;
    box-shadow: 0 6px 16px rgba(72, 187, 120, 0.2);
    padding: 1.5rem;
    /* El margin y max-width que tenías están bien, pero asegúrate que se ajustan al nuevo layout */
    margin: 0 auto; /* Lo centrará dentro del .main-content */
    max-width: 1100px; /* Un ancho máximo razonable */
    width: 100%;
  }
}
</style>