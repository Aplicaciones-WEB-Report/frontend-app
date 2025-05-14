<script setup>
import { ref, onMounted } from 'vue';
import FormularioEditarPerfilPostulante from '../components/FormularioEditarPerfilPostulante.component.vue'

defineOptions({
  name: 'PerfilPostulante'
});
const perfil = ref({
  nombre: '',
  correo: '',
  descripcion: '',
  fotoUrl: null,
});
const modoEdicion = ref(false);

onMounted(async () => {
  perfil.value = {
    nombre: 'Postulante X',
    correo: 'postulantex@gmail.com',
    descripcion: 'Quiero trabajo y aprender mucho.',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png',
  };
});

const activarModoEdicion = () => {
  modoEdicion.value = true;
};

const desactivarModoEdicion = () => {
  modoEdicion.value = false;
};

const procesarGuardado = async (payload) => {
  const { datosFormulario, archivoFoto } = payload;
  let nuevaUrlFotoParaGuardar = perfil.value.fotoUrl;

  if (archivoFoto) {
    await new Promise(resolve => setTimeout(resolve, 500));
    nuevaUrlFotoParaGuardar = URL.createObjectURL(archivoFoto);
  }
  await new Promise(resolve => setTimeout(resolve, 300));
  perfil.value = { ...datosFormulario, fotoUrl: nuevaUrlFotoParaGuardar };
  desactivarModoEdicion();
};
</script>

<template>
  <div class="pagina-perfil-contenedor">
    <div v-if="!modoEdicion" class="tarjeta-perfil-vista">
      <div class="cabecera-perfil-vista">
        <h1 class="titulo-perfil-vista">Perfil</h1>
      </div>

      <div class="p-grid grid-principal-vista">
        <div class="p-col-12 md:p-col-8 columna-info-vista">
          <div class="p-field">
            <label>Nombre</label>
            <div class="valor-visualizacion">{{ perfil.nombre }}</div>
          </div>
          <div class="p-field">
            <label>Correo Electrónico</label>
            <div class="valor-visualizacion">{{ perfil.correo }}</div>
          </div>
          <div class="p-field">
            <label>Descripción</label>
            <div class="valor-visualizacion descripcion">{{ perfil.descripcion }}</div>
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
          <p class="etiqueta-logo-vista">Foto de Perfil</p>
          <div class="circulo-logo-vista">
            <img
                v-if="perfil.fotoUrl"
                :src="perfil.fotoUrl"
                alt="Foto de Perfil"
                class="imagen-logo"
            />
            <span v-else class="pi pi-user icono-placeholder-logo"></span>
          </div>
        </div>
      </div>
    </div>

    <FormularioEditarPerfilPostulante
        v-if="modoEdicion"
        :datosInicialesPerfil="perfil"
        @guardar-cambios-postulante="procesarGuardado"
        @cancelar-edicion-postulante="desactivarModoEdicion"
    />
  </div>
</template>

<style scoped>
.pagina-perfil-contenedor {
  background-color: #f7f9fc;
  padding: 25px 30px;
  font-family: Arial, sans-serif;
}
.tarjeta-perfil-vista {
  background-color: #ffffff;
  padding: 25px 30px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05), 0 2px 8px rgba(0,0,0,0.05);
}
.cabecera-perfil-vista {
  margin-bottom: 20px;
}
.titulo-perfil-vista {
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
}

.grid-principal-vista {
  align-items: flex-start;
}

.columna-info-vista {
  display: flex;
  flex-direction: column;
  padding-right: 20px;
  box-sizing: border-box;
}
.columna-info-vista .p-field {
  margin-bottom: 16px;
}
.columna-info-vista .p-field label {
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
  background-color: #2c3e50 ;
  border-color: #2c3e50;
  color: #ffffff ;
  border-radius: 6px ;
  padding: 9px 24px ;
  font-weight: 500;
  font-size: 14px;
}
.boton-editar-vista.p-button:hover {
  background-color: #1e2b37 ;
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
  width: 150px;
  height: 150px;
  border: 3px solid #1a73e8;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}
.imagen-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.icono-placeholder-logo {
  font-size: 4rem;
  color: #ccc;
}

</style>