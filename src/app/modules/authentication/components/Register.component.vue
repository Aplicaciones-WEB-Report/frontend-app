<script>
import { register } from "../services/roles.service.js";
import router from '../../../routers/router.js';

export default {
  name: "Register.component",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    async handleRegister() {
      if (!this.name || !this.email || !this.password) {
        alert("Por favor, completa todos los campos.");
        return;
      }
      try {
        const userData = {
          name: this.name,
          email: this.email,
          password: this.password
        };
        await register(userData);
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        router.push('/login');
      } catch (error) {
        alert(error.message || "Ocurrió un error al registrarse.");
      }
    }
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="auth-container">
      <!-- Panel de Marca (Izquierda) -->
      <div class="branding-panel">
        <div class="branding-content">
          <h2>Únete a la comunidad de innovadores.</h2>
          <p>Crea tu perfil y empieza a explorar un mundo de posibilidades ilimitadas con Jobsy.</p>
        </div>
      </div>

      <!-- Panel de Formulario (Derecha) -->
      <div class="form-panel">
        <!-- Logo movido aquí -->
        <router-link to="/select-role">
          <img src="../../../../app/assets/logo.png" alt="Jobsy Logo" class="form-logo" />
        </router-link>

        <h2 class="title">Crea tu cuenta</h2>
        <form @submit.prevent="handleRegister">
          <div class="form-group">
            <label for="name">Nombre</label>
            <input id="name" v-model="name" type="text" placeholder="Tu nombre o el de tu empresa" required />
          </div>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input id="email" v-model="email" type="email" placeholder="ejemplo@email.com" required />
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input id="password" v-model="password" type="password" placeholder="Mínimo 6 caracteres" required />
          </div>
          <button type="submit" class="submit-button">Crear Cuenta</button>
        </form>
        <div class="switch-form-link">
          ¿Ya tienes una cuenta? <router-link to="/login">Inicia sesión</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-page {
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

.auth-container {
  display: flex;
  width: 100%;
  max-width: 950px;
  min-height: 600px;
  background: linear-gradient(
      to bottom,
      rgba(255, 255, 255, 0.95) 0%,   /* Color superior: Blanco casi opaco */
      rgba(255, 255, 255, 0.65) 100%  /* Color inferior: Blanco más transparente */
  );
  backdrop-filter: blur(12px);
  border-radius: 24px;
  box-shadow: 0 10px 50px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* --- Panel de Marca (Izquierda) con verdes claros --- */
.branding-panel {
  flex-basis: 45%;
  color: white;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  background-image:
      linear-gradient(to top, rgba(44, 94, 57, 0.95), rgba(62, 114, 29, 0.8)),
      url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1932&auto=format&fit=crop');
  background-size: cover;
  background-position: center;
}

.branding-panel h2 {
  font-size: 2.2rem;
  font-weight: 700;
  line-height: 1.3;
  margin-bottom: 1rem;
}

.branding-panel p {
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
}

/* --- Panel del Formulario (Derecha) --- */
.form-panel {
  flex-basis: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 4rem;
}

/* Estilo para el logo dentro del formulario */
.form-logo {
  height: 60px;
  width: auto;
  margin-bottom: 2rem;
  display: block; /* Para que el margin auto funcione */
  margin-left: 26%;
  margin-right: auto;
}

.title {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 2rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.25rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
  color: #495057;
}

.form-group input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
}

.form-group input:focus {
  outline: none;
  border-color: #A8D589;
  box-shadow: 0 0 0 4px rgba(168, 213, 137, 0.2);
}

.submit-button {
  width: 100%;
  padding: 15px;
  margin-top: 1rem;
  background-color: #A8D589;
  border: none;
  color: #3E721D;
  border-radius: 10px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.2s;
}

.submit-button:hover {
  background-color: #3E721D;
  color: white;
  transform: translateY(-2px);
}

.switch-form-link {
  margin-top: 2rem;
  text-align: center;
  font-size: 0.95rem;
  color: #6c757d;
}

.switch-form-link a {
  color: #3E721D;
  font-weight: 600;
  text-decoration: none;
}

.switch-form-link a:hover {
  text-decoration: underline;
}

/* --- Responsividad --- */
@media (max-width: 992px) {
  .branding-panel {
    display: none;
  }
  .form-panel {
    flex-basis: 100%;
    padding: 2rem;
  }
  .auth-container {
    min-height: auto;
    width: 90%;
    max-width: 480px;
  }
}
</style>
