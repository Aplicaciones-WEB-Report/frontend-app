<script setup>
import { ref, onMounted } from 'vue';
import FormularioEditarPerfilReclutador from '../components/FormularioEditarPerfilReclutador.component.vue';
import { updateUserProfile } from '../../authentication/services/roles.service.js';


const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = reject;
});


defineOptions({ name: 'PerfilReclutador' });

const perfil = ref({
  id: null,
  companyName: '',
  email: '',
  description: '',
  logoUrl: null, // Este campo guardará la cadena Base64
});
const modoEdicion = ref(false);
const userObjectToEdit = ref(null);

onMounted(() => {
  const userData = JSON.parse(localStorage.getItem('user'));
  if (userData) {
    userObjectToEdit.value = userData;
    perfil.value = {
      id: userData.id,
      companyName: userData.name,
      email: userData.email,
      description: userData.description || 'Añade una descripción de la empresa.',
      logoUrl: userData.logoUrl || 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
    };
  }
});

const activarModoEdicion = () => modoEdicion.value = true;
const desactivarModoEdicion = () => modoEdicion.value = false;

// --- FUNCIÓN DE GUARDADO MODIFICADA ---
const procesarGuardado = async (payload) => {
  const { datosFormulario, archivoLogo } = payload;

  const perfilParaActualizar = { ...userObjectToEdit.value };

  if (archivoLogo) {
    try {
      perfilParaActualizar.logoUrl = await toBase64(archivoLogo);
    } catch (error) {
      console.error("Error al convertir la imagen:", error);
      alert("Hubo un problema al procesar la imagen.");
      return;
    }
  }

  perfilParaActualizar.name = datosFormulario.companyName;
  perfilParaActualizar.description = datosFormulario.description;

  try {
    const perfilActualizado = await updateUserProfile(perfilParaActualizar);

    perfil.value.companyName = perfilActualizado.name;
    perfil.value.description = perfilActualizado.description;
    perfil.value.logoUrl = perfilActualizado.logoUrl; // <-- Actualizamos el logo

    alert("Perfil actualizado correctamente.");
    desactivarModoEdicion();
  } catch(error) {
    alert("No se pudo actualizar el perfil.");
  }
};
</script>

<template>
  <div class="pagina-perfil-contenedor">
    <div v-if="!modoEdicion" class="tarjeta-vista-perfil">
      <div class="cabecera-vista-perfil">
        <h1 class="titulo-vista-perfil">Perfil</h1>
      </div>

      <div class="p-grid grid-principal-vista">
        <div class="p-col-12 md:p-col-8 columna-info-principal-vista">
          <div class="p-field">
            <label>Nombre de la Empresa</label>
            <div class="valor-visualizacion">{{ perfil.companyName }}</div>
          </div>
          <div class="p-field">
            <label>Correo Electrónico</label>
            <div class="valor-visualizacion">{{ perfil.email }}</div>
          </div>
          <div class="p-field">
            <label>Descripción</label>
            <div class="valor-visualizacion descripcion">{{ perfil.description }}</div>
          </div>
          <div class="contenedor-acciones-vista">
            <pv-button
                label="Editar Perfil"
                class="boton-editar-vista"
                @click="activarModoEdicion"
            />
          </div>
        </div>

        <div class="p-col-12 md:p-col-4 columna-logo-vista">
          <p class="etiqueta-logo-vista">Logo de la Empresa</p>
          <div class="circulo-logo-vista">
            <img v-if="perfil.logoUrl" :src="perfil.logoUrl" alt="Logo Empresa" class="imagen-logo-empresa-vista"/>
            <span v-else class="pi pi-camera icono-placeholder-logo"></span>
          </div>
        </div>
      </div>
    </div>

    <FormularioEditarPerfilReclutador
        v-if="modoEdicion"
        :datosInicialesPerfil="perfil"
        @guardar-cambios="procesarGuardado"
        @cancelar-edicion="desactivarModoEdicion"
    >
    </FormularioEditarPerfilReclutador>
  </div>
</template>

<style scoped>
.pagina-perfil-contenedor {
  background-color: #f7f9fc;
  padding: 25px 30px;
  font-family: Arial, sans-serif;
}

.tarjeta-vista-perfil {
  background-color: #ffffff;
  padding: 25px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.05);
}

.cabecera-vista-perfil {
  margin-bottom: 20px;
}

.titulo-vista-perfil {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.grid-principal-vista {
  align-items: flex-start;
}

.columna-info-principal-vista {
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  box-sizing: border-box;
}

.columna-info-principal-vista .p-field {
  margin-bottom: 16px;
}

.columna-info-principal-vista .p-field label {
  font-size: 13px;
  color: #5f6368;
  margin-bottom: 7px;
  display: block;
  font-weight: 500;
}

.valor-visualizacion {
  background-color: #e9f2f9;
  border: 1px solid #d1e0ee;
  border-radius: 6px;
  padding: 10px 14px;
  color: #202124;
  min-height: 42px;
  line-height: 1.5;
  font-size: 14px;
  box-sizing: border-box;
  word-wrap: break-word;
}
.valor-visualizacion.descripcion {
  min-height: 90px;
  white-space: pre-wrap;
}

.contenedor-acciones-vista {
  margin-top: auto;
  padding-top: 25px;
  display: flex;
  justify-content: flex-end;
}

.boton-editar-vista.p-button {
  background-color: #2c3e50 !important;
  border-color: #2c3e50 !important;
  color: #ffffff !important;
  border-radius: 6px !important;
  padding: 9px 24px !important;
  font-weight: 500;
  font-size: 14px;
}
.boton-editar-vista.p-button:hover {
  background-color: #1e2b37 !important;
}

.columna-logo-vista {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-top: 5px;
}
.etiqueta-logo-vista {
  font-size: 13px;
  color: #5f6368;
  margin-bottom: 10px;
  font-weight: 500;
}
.circulo-logo-vista {
  width: 160px;
  height: 160px;
  border: 4px solid #1a73e8;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.imagen-logo-empresa-vista {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.icono-placeholder-logo {
  font-size: 3rem;
  color: #ccc;
}

@media (max-width: 767px) {
  .pagina-perfil-contenedor {
    padding: 20px 15px;
  }
  .tarjeta-vista-perfil{
    padding: 20px 15px;
  }

  .grid-principal-vista,
  .grid-contenido-formulario {
    flex-direction: column;
  }

  .columna-logo-vista,
  .columna-logo-formulario {
    order: -1;
    margin-bottom: 25px;
    width: 100%;
    padding-right: 0;
  }
  .columna-info-principal-vista,
  .columna-campos-formulario {
    padding-right: 0;
    width: 100%;
  }
  .contenedor-acciones-vista,
  .pie-acciones-formulario {
    justify-content: center;
    margin-top: 20px;
  }
  .titulo-vista-perfil,
  .titulo-formulario-editar {
    font-size: 20px;
  }
}
</style>