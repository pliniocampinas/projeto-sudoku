<template>
  <div id="sudoku-table">
      <!-- <label> [{{index}}]</label> -->
    <b-form-input v-model="value" ></b-form-input>
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

#sudoku-table {
    background-color: blue;
}

.wa-9 {
  -webkit-box-flex: 0;
      -ms-flex: 0 0 20% !important;
          flex: 0 0 20% !important;
  max-width: 20%;
}

</style>
