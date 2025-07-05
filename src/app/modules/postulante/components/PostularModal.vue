<script>
export default {
  name: 'PostularModal',
  props: {
    oferta: {
      type: Object,
      required: true
    }
  },
  emits: ['cerrar', 'confirmar-postulacion'],
  data() {
    return {
      cvUrl: ''
    };
  },
  methods: {
    confirmar() {
      // Validación simple para asegurar que es una URL
      try {
        new URL(this.cvUrl);
      } catch (_) {
        alert('Por favor, introduce una URL válida (ej: https://...).');
        return false;
      }
      this.$emit('confirmar-postulacion', this.cvUrl);
    }
  }
};
</script>

<template>
  <div class="modal-overlay" @click.self="$emit('cerrar')">
    <div class="modal-container">
      <button class="close-button" @click="$emit('cerrar')">×</button>
      <h3>Postular a: {{ oferta.title }}</h3>
      <p class="subtitle">¡Estás a un paso! Pega el enlace a tu CV para completar tu postulación.</p>

      <form @submit.prevent="confirmar">
        <label for="cvUrl">Enlace a tu CV (PDF en la nube)</label>
        <input
            id="cvUrl"
            v-model="cvUrl"
            type="url"
            placeholder="https://ejemplo.com/mi-cv.pdf"
            required
        />
        <p class="input-hint">Asegúrate de que el enlace sea público y accesible.</p>
        <button type="submit" class="submit-button">Confirmar Postulación</button>
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
  max-width: 550px;
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

form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  color: #495057;
}

form input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  margin-bottom: 0.5rem;
}

.input-hint {
  font-size: 0.8rem;
  color: #888;
  margin-top: 0;
  margin-bottom: 1.5rem;
}

.submit-button {
  width: 100%;
  padding: 0.9rem;
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