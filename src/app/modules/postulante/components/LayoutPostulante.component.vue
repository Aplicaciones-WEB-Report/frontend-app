<script>
import HeaderComponent from "../../../shared/Header.component.vue";
import PostulanteSidebar from "../../../shared/PostulanteSidebar.vue";

export default {
  name: "LayoutPostulante.component",
  components: {
    HeaderComponent,
    PostulanteSidebar,
  }
}
</script>

<template>
  <div>
    <HeaderComponent />
    <div class="dashboard-container">
      <PostulanteSidebar />
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