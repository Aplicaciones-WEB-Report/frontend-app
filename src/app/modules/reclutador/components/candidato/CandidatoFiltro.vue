<script>
export default {
  name: 'CandidatoFiltro',
  props: {
    filtro: String
  }
};
</script>

<template>
  <div class="flex flex-column sm:flex-row gap-3 mb-4 align-items-center">
    <input
        :value="filtro"
        @input="$emit('update:filtro', $event.target.value)"
        type="text"
        class="p-inputtext p-component w-full sm:w-30rem"
        :placeholder="$t('buscar_por_nombre')"
    />
    <button @click="$emit('filtrar')" class="p-button p-component">
      {{ $t('filtrar') }}
    </button>
  </div>
</template>

<style scoped>
.search-filter {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 8px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
}

button {
  background-color: #204080;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
}
</style>