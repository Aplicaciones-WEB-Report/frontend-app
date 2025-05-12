<script>
import { register } from "../services/roles.service.js";
import HeaderComponent from "../../../shared/Header.component.vue";

export default {
  name: "Register.component",
  components: {HeaderComponent},
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {register}

};
</script>

<template>
  <HeaderComponent />
  <div class="auth-container">
    <div class="auth-card">
      <h2>Registrarse</h2>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input id="name" v-model="name" type="text" placeholder="Nombre" required />
        </div>
        <div class="form-group">
          <label for="email">E-mail</label>
          <input id="email" v-model="email" type="email" placeholder="E-mail" required />
        </div>
        <div class="form-group">
          <label for="password">Contraseña</label>
          <input id="password" v-model="password" type="password" placeholder="Contraseña" required />
        </div>
        <pv-button type="submit">Registrarse</pv-button>
      </form>
      <router-link to="/login" class="link">¿Ya tienes cuenta? Inicia sesión</router-link>
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