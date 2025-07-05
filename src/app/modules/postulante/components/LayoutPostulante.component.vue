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
  background-image: url('https://lh7-rt.googleusercontent.com/docsz/AD_4nXfYhoMg9TpR-XpVvYNskrbuDrkZXl-G0x4OeiB44_akp5oQVgSSphIrSScr_WAnkMZ7yLLVHqN1ucKdvzZBzNXhvgYB3MLT2E0EXmnmSeqrLx681oUWNMAABMCI5ra4AY3BR-K6?key=mZ-JPZW_wxy9hU88SGvQiA');
  background-size: cover;
  background-position: center;
  overflow-y: auto;
}
</style>

