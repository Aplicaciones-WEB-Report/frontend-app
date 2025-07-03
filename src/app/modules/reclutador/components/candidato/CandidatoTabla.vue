<script>
export default {
  name: 'CandidatoTabla',
  props: {
    candidatos: Array
  }
};
</script>

<template>
  <div class="overflow-x-auto">
    <table>
      <thead>
      <tr>
        <th>Nombre</th>
        <th>Nro° Publicación</th>
        <th>Curriculum Vitae</th>
        <th>Estado</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(candidato, index) in candidatos" :key="index">
        <td>{{ candidato.name }}</td>
        <td>{{ candidato.publicationNumber }}</td>
        <td><a :href="candidato.cv" target="_blank">{{ candidato.cv }}</a></td>
        <td>{{ candidato.status }}</td>
        <td>
          <button class="ver-mas" @click="$emit('verMas', candidato)">Detalles</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-spacing: 8px; /* Espaciado entre celdas */
  margin-bottom: 20px;
  font-size: 14px;
}

th {
  background-color: #a2d45e;
  color: white;
  padding: 10px;
  text-align: left;
  border-radius: 6px;
}

td {
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 6px; /* Bordes suaves en celdas */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06); /* Suave separación */
}

.ver-mas {
  background-color: #204080;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
</style>