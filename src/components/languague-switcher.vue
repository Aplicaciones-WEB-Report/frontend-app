<!-- src/components/language-switcher.vue -->
<script setup>
import { useI18n } from 'vue-i18n';
const { locale, availableLocales } = useI18n();
</script>

<template>
  <div class="select-wrapper">
    <span class="pi pi-globe icon-left"></span>

    <select v-model="locale">
      <option v-for="lang in availableLocales" :key="lang" :value="lang">
        {{ lang }}
      </option>
    </select>

    <span class="pi pi-angle-down icon-right"></span>
  </div>
</template>

<style scoped>
.select-wrapper {
  position: relative;
  width: 140px;
  margin: 90px auto 0 auto; /* Centrado horizontal */
  font-family: 'Montserrat', sans-serif;
}

.select-wrapper select {
  appearance: none;
  width: 100%;
  padding: 10px 40px;
  border-radius: 12px;
  border: none;
  background-color: #1d578c;
  color: white;
  text-align: center;
  align-items: center;
  box-shadow: 0 4px 10px rgba(59, 89, 152, 0.25);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

.select-wrapper:hover select {
  background-color: #A8D589;
  border: 2px solid #1e2b37;
  color: #1e2b37;
}

.select-wrapper:hover .icon-left,
.select-wrapper:hover .icon-right {
  color: #1e2b37;
}

/* Ícono izquierda (🌐) */
.icon-left {
  position: absolute;
  top: 50%;
  left: 12px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 1.2rem;
  color: #ffffff;
}

/* Ícono derecha (▼) */
.icon-right {
  position: absolute;
  top: 50%;
  right:12px;
  transform: translateY(-50%);
  pointer-events: none;
  font-size: 1rem;
  color: #ffffff;
}
</style>
