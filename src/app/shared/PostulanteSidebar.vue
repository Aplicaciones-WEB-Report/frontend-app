<script>
import { logout } from '../modules/authentication/services/roles.service.js';
import LanguageSwitcher from "../../components/languague-switcher.vue";

export default {
  name: "PostulanteSidebar",
  components: {LanguageSwitcher},

  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  methods: {
    logout,
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    closeMobileMenu() {
      this.isMobileMenuOpen = false;
    }
  },
  mounted() {
    // Cerrar menú al hacer clic fuera de él en móvil
    document.addEventListener('click', (e) => {
      if (window.innerWidth <= 768 && this.isMobileMenuOpen) {
        const sidebar = this.$refs.sidebar;
        const hamburger = this.$refs.hamburger;
        if (!sidebar.contains(e.target) && !hamburger.contains(e.target)) {
          this.closeMobileMenu();
        }
      }
    });

    // Cerrar menú al cambiar tamaño de ventana
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        this.isMobileMenuOpen = false;
      }
    });
  }
}
</script>

<template>
  <!-- Botón hamburguesa - solo visible en móvil -->
  <button
      ref="hamburger"
      class="hamburger-btn"
      @click="toggleMobileMenu"
      :class="{ 'active': isMobileMenuOpen }"
  >
    <span></span>
    <span></span>
    <span></span>
  </button>

  <!-- Overlay para móvil -->
  <div
      v-if="isMobileMenuOpen"
      class="mobile-overlay"
      @click="closeMobileMenu"
  ></div>

  <aside
      ref="sidebar"
      class="sidebar postulante-sidebar"
      :class="{ 'mobile-open': isMobileMenuOpen }"
  >
    <nav>
      <ul>
        <li><router-link to="/postulante/panel-principal" @click="closeMobileMenu">{{$t("panel")}}</router-link></li>
        <li><router-link to="/postulante/ofertas-empleo" @click="closeMobileMenu">{{$t("buscar_empleos")}}</router-link></li>
        <li><router-link to="/postulante/postulaciones" @click="closeMobileMenu">{{$t("postulaciones")}}</router-link></li>
        <li><router-link to="/postulante/bandeja-entrada" @click="closeMobileMenu">{{$t("bandeja")}}</router-link></li>
        <li><router-link to="/postulante/perfil" @click="closeMobileMenu">{{$t("perfil")}}</router-link></li>
      </ul>
    </nav>
    <LanguageSwitcher />

    <div class="logout-section">
      <a href="#" @click.prevent="logout" class="logout-link">{{$t("cerrar_sesion")}}</a>
    </div>
  </aside>
</template>

<style scoped>
/* Botón hamburguesa */
.hamburger-btn {
  display: none;
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1001;
  background: #3B5998;
  border: none;
  border-radius: 8px;
  width: 45px;
  height: 45px;
  cursor: pointer;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.hamburger-btn span {
  width: 25px;
  height: 3px;
  background-color: white;
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger-btn.active span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.hamburger-btn.active span:nth-child(2) {
  opacity: 0;
}

.hamburger-btn.active span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

/* Overlay para móvil */
.mobile-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}


.sidebar {
  width: 280px;
  background-color: #ffffff;
  padding: 30px 20px;
  height: calc(100vh - 90px - 7px);
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
  border: 1px solid #e0e0e0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow-y: auto;
}

nav ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

nav li {
  margin-bottom: 15px;
}

nav li a {
  display: block;
  padding: 15px 20px;
  text-decoration: none;
  border-radius: 30px;
  font-weight: 500;
  font-size: 1rem;
  text-align: center;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  background-color: #A8D589;
  color: #3E721D;
}

nav li a.router-link-exact-active,
nav li a:hover {
  background-color: #3B5998;
  color: white;
  box-shadow: 0 4px 10px rgba(59, 89, 152, 0.25);
}

.logout-section {
  margin-top: auto;
  padding-top: 20px;
  padding-bottom: 10px;
  text-align: center;
  flex-shrink: 0;
}

.logout-link {
  color: #3B5998;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  padding: 10px;
  display: inline-block;
}

.logout-link:hover {
  text-decoration: underline;
}


@media (max-width: 768px) {
  .hamburger-btn {
    display: flex;
  }

  .mobile-overlay {
    display: block;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: -280px;
    width: 280px;
    height: 100vh;
    z-index: 1000;
    transition: left 0.3s ease;
    border: none;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
  }

  .sidebar.mobile-open {
    left: 0;
  }

  /* Agregar padding-top para evitar que el contenido se superponga con el botón hamburguesa */
  .sidebar nav {
    padding-top: 50px;
  }
}

@media (max-width: 480px) {
  .sidebar {
    width: 250px;
    left: -250px;
  }

  .hamburger-btn {
    width: 40px;
    height: 40px;
  }

  .hamburger-btn span {
    width: 20px;
  }
}</style>
