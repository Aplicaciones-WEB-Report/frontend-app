// src/app/modules/web/components/reclutador/ReclutadorSidebar.vue
<script>
import { logout } from '../modules/authentication/services/roles.service.js';

export default {
  name: "ReclutadorSidebar",
  methods: {logout}
}
</script>

<template>
  <aside class="sidebar reclutador-sidebar">
    <nav>
      <ul>
        <li><router-link to="/reclutador/panel-principal">Panel Principal</router-link></li>
        <li><router-link to="/reclutador/publicaciones">Publicaciones</router-link></li>
        <li><router-link to="/reclutador/candidatos">Candidatos</router-link></li>
        <li><router-link to="/reclutador/analiticas">Analíticas</router-link></li>
        <li><router-link to="/reclutador/asistencia-ia">Asistencia IA</router-link></li>
        <li><router-link to="/reclutador/perfil">Perfil</router-link></li>
      </ul>
    </nav>
    <div class="logout-section">
      <a href="#" @click.prevent="logout" class="logout-link">Cerrar sesión</a>
    </div>
  </aside>
</template>

<style scoped>
.sidebar {
  width: 280px;
  background-color: #ffffff;
  padding: 30px 20px;
  height: calc(100vh - 90px - 7px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
}


nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  margin-bottom: 15px;
}

nav li a {
  display: block;
  padding: 15px 20px;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: #A8D589;
  color: #3E721D;
}

nav li a.router-link-exact-active,
nav li a:hover {
  background-color: #3B5998;
  color: white;
  box-shadow: 0 4px 10px rgba(59, 89, 152, 0.25);
}

.logout-section {
  margin-top: auto;
  padding-top: 20px;
  padding-bottom: 10px;
  text-align: center;

  flex-shrink: 0;
}

.logout-link {
  color: #3B5998;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 10px;
  display: inline-block;
}

.logout-link:hover {
  text-decoration: underline;
}
</style>