<script>
import HeaderComponent from "../../../shared/Header.component.vue";
import ReclutadorSidebar from "../../../shared/ReclutadorSidebar.vue";
export default {
  name: "LayoutReclutador.component",
  components: {
    HeaderComponent,
    ReclutadorSidebar,
  }
}
</script>

<template>
  <div>
    <HeaderComponent />
    <div class="dashboard-container">
      <ReclutadorSidebar />
      <main class="content-area">
        <router-view></router-view>
      </main>

    </div>
  </div>
</template>

<style scoped>

.dashboard-container {
  display: flex;
  flex-grow: 1;
}

.content-area {
  flex-grow: 1;
  padding: 20px;
  background-color: #ffffff;
  overflow-y: auto;
}
</style>