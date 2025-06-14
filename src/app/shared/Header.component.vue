<script>
export default {
  name: "Header.component"
}
</script>

<template>
  <header class="app-header">
    <div class="header-card">
      <img src="../assets/logo.png" alt="Logo" class="logo" />
    </div>
  </header>
</template>

<style scoped>
.app-header {
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

.header-card {
  padding: 0.5rem;
  width: auto;
  border: none;
}

.logo {
  height: 60px;
  width: auto;
}

/* Media query para móvil - 768px y menos */
@media (max-width: 768px) {
  .app-header {
    justify-content: flex-end;
    /* Mueve el contenido a la derecha */
    padding: 0.5rem; /* Reduce el padding en móvil */
  }

  .header-card {
    padding: 0.25rem;
  }

  .logo {
    height: 65px;
    /* Logo más pequeño en móvil */
  }
}

/* Media query para tablets - entre 769px y 1024px */
@media (min-width: 769px) and (max-width: 1024px) {
  .logo {
    height: 50px; /* Tamaño intermedio para tablets */

  }
}
</style>