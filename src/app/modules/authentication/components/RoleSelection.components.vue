<script>
import { selectRole } from "../services/roles.service.js";
// El HeaderComponent no lo usaremos aquí para tener un fondo de pantalla completo.

export default {
  name: "RoleSelection.components",
  methods: {
    selectRole
  }
};
</script>

<template>
  <div class="role-selection-page">
    <div class="content-container">
      <img src="../../../../app/assets/logo.png" alt="Jobsy Logo" class="jobsy-logo" />
      <h1 class="welcome-title">¡Bienvenido a Jobsy!</h1>
      <p class="welcome-subtitle">Elige tu rol para comenzar a conectar talento con oportunidades.</p>

      <div class="roles-wrapper">
        <!-- Tarjeta Postulante -->
        <div class="role-card" @click="selectRole('postulante')">
          <div class="image-container">
            <img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXe8tH6hHmGeth0A_V4bH407FOPLcYlngujGxamFHG3DC7Em56HlZ7b4eNOscmQ7Bq-s9zmN5f4czxzsNT0IZk0pDox1fO9h9iNaTD7ePf0m4D0z2XouEPfeL8xtXXHMbBc5A7fo2w?key=mZ-JPZW_wxy9hU88SGvQiA" alt="Postulante" class="role-image"/>
          </div>
          <div class="card-body">
            <h2 class="role-title">Postulante</h2>
            <p class="role-description">Busca empleo y conécta con empresas.</p>
            <button class="select-button">Seleccionar</button>
          </div>
        </div>

        <!-- Tarjeta Reclutador -->
        <div class="role-card" @click="selectRole('reclutador')">
          <div class="image-container">
            <img src="https://lh7-rt.googleusercontent.com/docsz/AD_4nXeYv3lvIJ7D8DXNuQgKXin24bKcMLnfakpLTFT9oK84LwxTYR5v086DTeMHbBGgF_3ETFLMeqIRdNtiy8uH-IAjZZlcXCrwCO90lcSP0F5hCVXWoNXconyB0FMATZ_12atRurMwzA?key=mZ-JPZW_wxy9hU88SGvQiA" alt="Reclutador" class="role-image"/>
          </div>
          <div class="card-body">
            <h2 class="role-title">Reclutador</h2>
            <p class="role-description">Publica vacantes y encuentra talento.</p>
            <button class="select-button">Seleccionar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Para un mejor resultado, asegúrate de tener la fuente 'Montserrat' en tu proyecto. */
.role-selection-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  background-image: url('https://lh7-rt.googleusercontent.com/docsz/AD_4nXfYhoMg9TpR-XpVvYNskrbuDrkZXl-G0x4OeiB44_akp5oQVgSSphIrSScr_WAnkMZ7yLLVHqN1ucKdvzZBzNXhvgYB3MLT2E0EXmnmSeqrLx681oUWNMAABMCI5ra4AY3BR-K6?key=mZ-JPZW_wxy9hU88SGvQiA');
  background-size: cover;
  background-position: center;
  font-family: 'Montserrat', sans-serif;
}

.content-container {
  /* --- REEMPLAZA LAS PROPIEDADES DE FONDO CON ESTO --- */
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.95) 0%,   /* Color superior: Blanco casi opaco */
      rgba(255, 255, 255, 0.65) 100%  /* Color inferior: Blanco más transparente */
  );
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  /* ---------------------------------------------------- */

  padding: 3rem 4rem;
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 900px;
  width: 100%;
}

.jobsy-logo {
  height: 55px;
  margin-bottom: 2rem;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #2c3e50;
  margin: 0;
}

.welcome-subtitle {
  font-size: 1.1rem;
  color: #555;
  margin-top: 0.5rem;
  margin-bottom: 3rem;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
}

.roles-wrapper {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
}

.role-card {
  background-color: #ffffff;
  border-radius: 16px;
  border: 3px solid #f0f2f5; /* <-- Borde más grueso y sutil */
  width: 300px;
  text-align: center;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.role-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.08);
  border-color: #A8D589;
}

.image-container {
  height: 180px; /* Contenedor con altura fija para la imagen */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-sizing: border-box;
}

.role-image {
  max-width: 130px; /* <-- Imágenes centradas y con tamaño máximo */
  max-height: 130px;
  object-fit: contain;
}

.card-body {
  padding: 1rem 1.5rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.role-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: #333;
}

.role-description {
  color: #6c757d;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.select-button {
  padding: 12px 30px;
  border: none;
  border-radius: 50px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.2s ease;
  width: 100%;
  background-color: #B8DDBA; /* <-- Botón verde claro */
  color: #3E721D;
}

.select-button:hover {
  background-color: #3E721D; /* <-- Verde oscuro al pasar el mouse */
  color: white;
  transform: scale(1.02);
}

/* --- Media Queries para Responsividad --- */
@media (max-width: 900px) {
  .content-container {
    padding: 2rem;
  }
  .roles-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
  .role-card {
    width: 100%;
    max-width: 350px;
  }
}

@media (max-width: 480px) {
  .welcome-title {
    font-size: 2rem;
  }
  .content-container {
    padding: 2rem 1.5rem;
  }
}
</style>
