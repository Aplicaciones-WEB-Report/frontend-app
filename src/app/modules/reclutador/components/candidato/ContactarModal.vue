<script>
export default {
  name: 'ContactarModal',
  props: {
    candidato: {
      type: Object,
      required: true
    }
  },
  emits: ['cerrar', 'enviar'],
  data() {
    return {
      mensaje: ''
    };
  },
  methods: {
    enviarMensaje() {
      if (!this.mensaje.trim()) {
        alert('Por favor, escribe un mensaje.');
        return;
      }
      this.$emit('enviar', this.mensaje);
      this.mensaje = ''; // Limpiar el campo después de enviar
    }
  }
};
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('cerrar')">
    <div class="modal-container">
      <button class="close-button" @click="$emit('cerrar')">×</button>
      <h3>Contactar a {{ candidato.name }}</h3>
      <p class="subtitle">Escribe un mensaje para iniciar la conversación.</p>

      <form @submit.prevent="enviarMensaje">
        <textarea
            v-model="mensaje"
            rows="5"
            placeholder="Ej: Hola, estamos muy interesados en tu perfil y nos gustaría programar una entrevista..."
            required
        ></textarea>
        <button type="submit" class="submit-button">Enviar Mensaje</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  position: relative;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #aaa;
}

h3 {
  margin-top: 0;
  font-size: 1.5rem;
  color: #2d3e50;
}

.subtitle {
  color: #6c757d;
  margin-bottom: 1.5rem;
}

textarea {
  width: 100%;
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-family: inherit;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: vertical;
}

.submit-button {
  width: 100%;
  padding: 0.8rem;
  background-color: #3E721D;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #2c5e39;
}
</style>