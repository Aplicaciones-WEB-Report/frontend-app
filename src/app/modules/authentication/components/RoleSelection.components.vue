<script>
import HeaderComponent from "../../../shared/Header.component.vue";
import { selectRole } from "../services/roles.service.js";

export default {
  name: "RoleSelection.components",
  components: {
    HeaderComponent
  },
  methods: {
    selectRole
  }
};
</script>

<template>
  <HeaderComponent />
  <div class="role-selection">
    <div class="roles">
      <pv-card class="role-card postulante">
        <template #header>
          <i class="pi pi-user role-icon"></i>
          <div class="role-info">
            <span>Postulante</span>
          </div>
        </template>
        <template #content>
          <div class="card-footer">
            <pv-button
                label="Seleccionar"
                class="boton"
                @click="selectRole('postulante')"
            />
          </div>
        </template>
      </pv-card>

      <pv-card class="role-card reclutador">
        <template #header>
          <i class="pi pi-user role-icon"></i>
          <div class="role-info">
            <span>Reclutador</span>
          </div>
        </template>
        <template #content>
          <div class="card-footer">
            <pv-button
                label="Seleccionar"
                class="boton"
                @click="selectRole('reclutador')"
            />
          </div>
        </template>
      </pv-card>
    </div>
  </div>
</template>

<style scoped>
.role-selection {
  text-align: center;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.roles {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;
}

.role-card {
  width: 250px;
  height: auto;
  min-height: 280px;
  cursor: default;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  transition: transform 0.3s ease;
  padding: 1rem 0.5rem;
}

.role-card:hover {
  transform: scale(1.05);
}

.role-info {
  margin-top: 1rem;
  text-align: center;
  padding: 1rem 0;
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
  margin-top: 1rem;
  font-size: 6rem;
  color: inherit;
}

.role-info span {
  font-size: 1.2rem;
  font-weight: bold;
  color: inherit;
}

.boton {
  background-color: white;
padding: 10px;
  border-radius: 15px;
}

.card-footer {
  padding-bottom: 1rem;
}


</style>

