<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue';

defineOptions({
  name: 'FormularioEditarPerfilReclutador'
});

const props = defineProps({
  // Recibe los datos iniciales del perfil desde el componente padre
  datosInicialesPerfil: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['guardar-cambios', 'cancelar-edicion']);
const datosEditables = ref({ companyName: '', email: '', description: '' });
const urlPrevisualizacion = ref(null);
const archivoLogoSeleccionadoLocal = ref(null);
const inputArchivoRef = ref(null);


watch(() => props.datosInicialesPerfil, (nuevosDatos) => {

  datosEditables.value.companyName = nuevosDatos.companyName || '';
  datosEditables.value.email = nuevosDatos.email || '';
  datosEditables.value.description = nuevosDatos.description || '';


  urlPrevisualizacion.value = nuevosDatos.logoUrl || null;

  archivoLogoSeleccionadoLocal.value = null;
}, { immediate: true, deep: true });


const accionGuardar = () => {
  emit('guardar-cambios', {
    datosFormulario: { ...datosEditables.value },
    archivoLogo: archivoLogoSeleccionadoLocal.value
  });
};

const accionCancelar = () => {
  emit('cancelar-edicion');
};

const activarSeleccionArchivo = () => {
  inputArchivoRef.value.click();
};

const manejarArchivoSeleccionado = (event) => {
  const archivo = event.target.files[0];
  if (archivo) {
    archivoLogoSeleccionadoLocal.value = archivo;
    urlPrevisualizacion.value = URL.createObjectURL(archivo);
  }
};
</script>


<template>
  <div class="contenedor-formulario-editar-perfil">
    <div class="cabecera-formulario-editar">
      <h2 class="titulo-formulario-editar">{{ $t('editar_perfil') }}</h2>
      <pv-button icon="pi pi-times" class="p-button-rounded p-button-text boton-cerrar-edicion" @click="accionCancelar" aria-label="Cerrar edición"/>
    </div>

    <div class="p-grid p-fluid grid-contenido-formulario">
      <!-- Columna de Información Editable (Izquierda) -->
      <div class="p-col-12 md:p-col-8 columna-campos-formulario">
        <div class="p-field espacio-campo">
          <label for="nombreEmpresaForm">{{ $t('nombre_empresa') }}</label>
          <pv-inputtext id="nombreEmpresaForm" v-model="datosEditables.companyName" class="campo-input-formulario"/>
        </div>

        <div class="p-field espacio-campo">
          <label for="correoEmpresaForm">{{ $t('correo_electronico') }}</label>
          <pv-inputtext id="correoEmpresaForm" v-model="datosEditables.email" type="email" class="campo-input-formulario"/>
        </div>

        <div class="p-field espacio-campo">
          <label for="descripcionEmpresaForm">{{ $t('descripcion') }}</label>
          <pv-textarea id="descripcionEmpresaForm" v-model="datosEditables.description" rows="5" autoResize class="campo-textarea-formulario"/>
        </div>
      </div>

      <div class="p-col-12 md:p-col-4 columna-logo-formulario">
        <p class="etiqueta-logo-formulario">{{ $t('logo_empresa') }}</p>
        <div class="area-subida-logo-formulario">
          <div class="circulo-logo-formulario" @click="activarSeleccionArchivo" :title="$t('cambiar_logo_tooltip')">
            <img v-if="urlPrevisualizacion" :src="urlPrevisualizacion" alt="Previsualización Logo" class="previsualizacion-logo-formulario"/>

            <span v-else class="pi pi-camera icono-placeholder-logo-grande"></span>
          </div>
          <pv-button :label="$t('cambiar_foto_perfil')" class="p-button-text enlace-cambiar-foto" @click="activarSeleccionArchivo" />
        </div>
        <input type="file" ref="inputArchivoRef" @change="manejarArchivoSeleccionado" style="display: none;" accept="image/*" />
      </div>
    </div>

    <div class="pie-acciones-formulario">
      <pv-button :label="$t('guardar_cambios')" class="boton-guardar-cambios" @click="accionGuardar" />
    </div>
  </div>
</template>

<style scoped>
.contenedor-formulario-editar-perfil {
  background-color: #ffffff;
  padding: 25px 30px 30px 30px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  margin-top: 20px;
}

.cabecera-formulario-editar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
}

.titulo-formulario-editar {
  font-size: 20px;
  font-weight: 500;
  color: #3c4043;
  margin: 0;
}

.boton-cerrar-edicion.p-button {
  color: #5f6368 !important;
  width: 36px;
  height: 36px;
}
.boton-cerrar-edicion.p-button:hover {
  background-color: rgba(0,0,0,0.04) !important;
}

.columna-campos-formulario .p-field {
  margin-bottom: 22px;
}

.columna-campos-formulario .p-field label {
  font-size: 13px;
  color: #5f6368;
  margin-bottom: 8px;
  display: block;
  font-weight: 500;
}

.campo-input-formulario.p-inputtext,
.campo-textarea-formulario.p-textarea {
  width: 100%;
  padding: 9px 12px;
  font-size: 14px;
  color: #202124;
  background-color: #ffffff;
  border: 1px solid #dadce0;
  border-radius: 4px;
  box-sizing: border-box;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.campo-input-formulario.p-inputtext:enabled:focus,
.campo-textarea-formulario.p-textarea:enabled:focus {
  border-color: #1a73e8;
  box-shadow: 0 0 0 1px #1a73e8;
  outline: none;
}
.campo-textarea-formulario.p-textarea {
  min-height: 90px;
  resize: vertical;
}

.columna-logo-formulario {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding-left: 20px; /* Espacio si el grid no tiene gap */
}
.etiqueta-logo-formulario {
  font-size: 13px;
  color: #5f6368;
  margin-bottom: 12px;
  font-weight: 500;
}
.area-subida-logo-formulario {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.circulo-logo-formulario {
  width: 150px;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 50%;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.2s;
}
.circulo-logo-formulario:hover {
  border-color: #1a73e8;
}
.previsualizacion-logo-formulario {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.icono-placeholder-logo-grande {
  font-size: 2.8rem;
  color: #bdc1c6;
}

.enlace-cambiar-foto.p-button-text {
  color: #1a73e8 ;
  font-size: 13px;
  font-weight: 500;
  padding: 4px 0 ;
}
.enlace-cambiar-foto.p-button-text:hover {
  text-decoration: underline;
  background-color: transparent;
}

.pie-acciones-formulario {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
}
.boton-guardar-cambios.p-button {
  background-color: #2c3e50 ;
  border-color: #2c3e50 ;
  color: #ffffff ;
  border-radius: 6px ;
  padding: 9px 24px;
  font-weight: 500;
  font-size: 14px;
}
.boton-guardar-cambios.p-button:hover {
  background-color: #1e2b37;
}
</style>