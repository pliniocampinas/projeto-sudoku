<template>
  <div id="sudoku-block">
    <div class="input-container">
      <input type="number" v-model="value" class="rounded-input">
    </div>
  </div>
</template>


<script>

export default {
  name: 'TableBlock',
  props: {
    index: { i: 0 }
  },
  data: function() {
    return {
      dValue: 0
    }
  },
  computed: {
    value: {
      get: function() {
        return this.dValue;
      },
      set: function(newValue) {
        if(this.dValue)
          this.dValue = newValue;
      }
    },
  }
}
</script>

<style scoped>

/* #sudoku-table {
    background-color: blue;
} */
#sudoku-block {
  max-width: 33%;
}

.input-sudoku input {
  text-align: center;
  color: red;
  overflow: visible;
} 

.input-container input {
  max-width: 90%;
  margin: 3%;
  text-align: center;
  font-weight: bolder;
  border-radius: 15%;
  border: 4px solid #2d9fd9;
}

</style>
