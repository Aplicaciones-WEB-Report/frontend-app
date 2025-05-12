<script>
import { login } from "../services/roles.service.js";
import HeaderComponent from "../../../shared/Header.component.vue";

export default {
  name: "Login.component",
  components: {HeaderComponent},
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {login}
};
</script>

<template>
  <HeaderComponent />
  <div class="auth-container">
    <div class="auth-card">
      <h2>Inicia sesión</h2>
      <form @submit.prevent="login">
        <div class="form-group">
          <label for="email">E-mail</label>
          <input id="email" v-model="email" type="email" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input id="password" v-model="password" type="password" required />
        </div>
        <pv-button type="submit">Inicia sesión</pv-button>
      </form>
      <router-link to="/register" class="link">¿No tienes cuenta? Regístrate</router-link>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  font-family: 'Montserrat', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
}

.auth-card {
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.auth-card h2 {
  margin-bottom: 1.5rem;
  color: #333;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.4rem;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 0.6rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: #85C872;
  border: none;
  color: white;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background-color: #558149;
}

.link {
  display: block;
  margin-top: 1rem;
  color: #007ad9;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}
</style>