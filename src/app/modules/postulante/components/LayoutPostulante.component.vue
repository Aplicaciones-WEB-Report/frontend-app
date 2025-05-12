<script>
import HeaderComponent from "../../../shared/Header.component.vue";
import PostulanteSidebar from "../../../shared/PostulanteSidebar.vue";

export default {
  name: "Layout.component",
  components: {
    HeaderComponent,
    PostulanteSidebar,
  }
}
</script>

<template>
  <div class="layout-wrapper">
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

</style>