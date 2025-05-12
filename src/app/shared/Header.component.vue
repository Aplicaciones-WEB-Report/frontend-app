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
</style>