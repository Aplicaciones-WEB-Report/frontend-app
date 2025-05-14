<script setup>
import { ref, watch } from 'vue';

defineOptions({
  name: 'FormularioEditarPerfilPostulante'
});

const props = defineProps({
  datosInicialesPerfil: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['guardar-cambios-postulante', 'cancelar-edicion-postulante']);

const datosEditables = ref({ nombre: '', correo: '', descripcion: '' });
const urlPrevisualizacion = ref(null);
const archivoFotoSeleccionadaLocal = ref(null);
const inputArchivoRef = ref(null);

watch(() => props.datosInicialesPerfil, (nuevosDatos) => {
  datosEditables.value = {
    nombre: nuevosDatos.nombre || '',
    correo: nuevosDatos.correo || '',
    descripcion: nuevosDatos.descripcion || '',
  };
  urlPrevisualizacion.value = nuevosDatos.fotoUrl || null;
  archivoFotoSeleccionadaLocal.value = null;
}, { immediate: true, deep: true });

const accionGuardar = () => {
  emit('guardar-cambios-postulante', {
    datosFormulario: { ...datosEditables.value },
    archivoFoto: archivoFotoSeleccionadaLocal.value
  });
};

const accionCancelar = () => {
  emit('cancelar-edicion-postulante');
};

const activarSeleccionArchivo = () => {
  inputArchivoRef.value.click();
};

const manejarArchivoSeleccionado = (event) => {
  const archivo = event.target.files[0];
  if (archivo) {
    archivoFotoSeleccionadaLocal.value = archivo;
    urlPrevisualizacion.value = URL.createObjectURL(archivo);
  }
};
</script>

<template>
  <div class="contenedor-formulario-editar">
    <div class="cabecera-formulario-editar">
      <h2 class="titulo-formulario-editar">Editar Perfil</h2>
      <pv-button
          icon="pi pi-times"
          class="p-button-rounded p-button-text boton-cerrar-edicion"
          @click="accionCancelar"
          aria-label="Cerrar edición"
      />
    </div>

    <div class="p-grid p-fluid grid-contenido-formulario">
      <div class="p-col-12 md:p-col-8 columna-campos-formulario">
        <div class="p-field">
          <label for="nombrePostulanteForm">Nombre Completo</label>
          <pv-inputtext
              id="nombrePostulanteForm"
              v-model="datosEditables.nombre"
              class="campo-input-formulario"
          />
        </div>

        <div class="p-field">
          <label for="correoPostulanteForm">Correo Electrónico</label>
          <pv-inputtext
              id="correoPostulanteForm"
              v-model="datosEditables.correo"
              type="email"
              class="campo-input-formulario"
          />
        </div>

        <div class="p-field">
          <label for="descripcionPostulanteForm">Descripción</label>
          <pv-textarea
              id="descripcionPostulanteForm"
              v-model="datosEditables.descripcion"
              rows="5"
              autoResize
              class="campo-textarea-formulario"
              placeholder="Ej: Busco oportunidades en desarrollo web..."
          />
        </div>
      </div>

      <div class="p-col-12 md:p-col-4 columna-logo-formulario">
        <p class="etiqueta-logo-formulario">Foto de Perfil</p>
        <div class="area-subida-logo">
          <div class="circulo-logo" @click="activarSeleccionArchivo" title="Haz clic para cambiar tu foto">
            <img
                v-if="urlPrevisualizacion"
                :src="urlPrevisualizacion"
                alt="Previsualización Foto"
                class="previsualizacion-logo"
            />
            <span v-else class="pi pi-user icono-placeholder-logo"></span>
          </div>
          <pv-button
              label="Cambiar foto"
              class="p-button-text enlace-cambiar-foto"
              @click="activarSeleccionArchivo"
          />
        </div>
        <input
            type="file"
            ref="inputArchivoRef"
            @change="manejarArchivoSeleccionado"
            style="display: none;"
            accept="image/*"
        />
      </div>
    </div>

    <div class="pie-acciones-formulario">
      <pv-button
          label="Guardar Cambios"
          class="boton-guardar"
          @click="accionGuardar"
      />
    </div>
  </div>
</template>

<style scoped>
.contenedor-formulario-editar {
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
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 15px;
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

.grid-contenido-formulario {
  align-items: flex-start;
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
  padding-left: 20px;
  padding-top: 5px;
}
.etiqueta-logo-formulario {
  font-size: 13px;
  color: #5f6368;
  margin-bottom: 12px;
  font-weight: 500;
}
.area-subida-logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.circulo-logo {
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
.circulo-logo:hover {
  border-color: #1a73e8;
}
.previsualizacion-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
  border-radius: 50%;
}
.icono-placeholder-logo {
  font-size: 4rem;
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
  background-color: transparent ;
}

.pie-acciones-formulario {
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: flex-end;
}
.boton-guardar.p-button {
  background-color: #2c3e50 ;
  border-color: #2c3e50;
  color: #ffffff ;
  border-radius: 6px ;
  padding: 9px 24px ;
  font-weight: 500;
  font-size: 14px;
}
.boton-guardar.p-button:hover {
  background-color: #1e2b37;
}

@media (max-width: 767px) {
  .contenedor-formulario-editar {
    padding: 20px 15px;
  }
  .grid-contenido-formulario {
    flex-direction: column;
  }
  .columna-logo-formulario {
    padding-left: 0;
    order: -1;
    margin-bottom: 25px;
  }
  .titulo-formulario-editar {
    font-size: 18px;
  }
  .pie-acciones-formulario {
    justify-content: center;
  }
}
</style>