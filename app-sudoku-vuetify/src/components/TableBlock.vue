<template>
  <div id="sudoku-table">
      <!-- <label> [{{index}}]</label> -->
    <!-- <b-form-input v-model="value" ></b-form-input> -->
    <div class="input-container">
      <input type="number" v-model="value" class="rounded-input">
    </div>
  </div>
</template>


<script>

export default {
  name: 'TableBlock',
  props: {
    value: Number,
    index: Number
  }
}
</script>

<style scoped>

/* #sudoku-table {
    background-color: blue;
} */


.input-sudoku input {
  text-align: center;
  color: red;
  overflow: visible;
} 

.input-container input {
  max-width: 100%;
  text-align: center;
  font-weight: bolder;
  border-radius: 15%;
  border: 4px solid #2d9fd9
}

</style>
