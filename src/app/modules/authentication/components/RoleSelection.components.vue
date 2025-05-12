<script>
import HeaderComponent from "../../../shared/Header.component.vue";
import { selectRole } from "../services/roles.service.js";

export default {
  name: "RoleSelection.components",
  components: { HeaderComponent },
  methods: {selectRole}
};
</script>

<template>
  <HeaderComponent />
  <div class="role-selection">
    <div class="roles">
      <pv-card class="role-card postulante" @click="selectRole('postulante')">
        <template #header>
          <i class="pi pi-user role-icon"></i>
          <div class="role-info">
            <span>Postulante</span>
          </div>
        </template>
      </pv-card>
      <pv-card class="role-card reclutador" @click="selectRole('reclutador')">
        <template #header>
          <i class="pi pi-user role-icon"></i>
          <div class="role-info">
            <span>Reclutador</span>
          </div>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<style scoped>
body {
  font-family: 'Montserrat', sans-serif;
}

.role-selection {
  text-align: center;
  padding: 2rem;
}

.roles {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.role-card {
  width: 250px;
  height: 250px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s ease;
  padding: 0;
}

.role-card:hover {
  transform: scale(1.05);
}

.role-info {
  text-align: center;
  padding: 1rem;
}

.postulante {
  background-color: #b9e4c9;
  color: #2d6a4f;
}

.reclutador {
  background-color: #d0e0f5;
  color: #0d3b66;
}

.role-icon {
  font-size: 6rem;
  color: inherit;
}

.role-info span {
  font-size: 1.2rem;
  font-weight: bold;
  color: inherit;
}
</style>