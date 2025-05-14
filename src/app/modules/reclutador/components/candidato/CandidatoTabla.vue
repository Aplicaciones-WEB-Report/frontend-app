<script>
export default {
  name: 'CandidatoTabla',
  props: {
    candidatos: Array
  }
};
</script>

<template>
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
        <button class="ver-mas" @click="$emit('verMas', candidato)">Ver más</button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 14px;
}

th {
  background-color: #a2d45e;
  color: white;
  padding: 10px;
  text-align: left;
  border-radius: 4px 4px 0 0;
}

td {
  padding: 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
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