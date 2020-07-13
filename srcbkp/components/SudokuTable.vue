<template>
  <div id="sudoku-table">
      <div class="container" >

        <div class="row"
          v-for="(index) in 9"
          v-bind:key="index"
        >
          <div class="col-1 tb-block"
              v-for=" (innerIndex) in 9"
              v-bind:key="innerIndex+index*9"
          >
            <TableBlock               
              v-bind:value="tableValues[(innerIndex - 1) + (index - 1)*9]"
              v-bind:index="(innerIndex - 1) + (index - 1)*9"
            />
          </div>
        </div>
      </div>
  </div>
</template>


<script>
import TableBlock from './TableBlock.vue'

export default {
  name: 'SudokuTable',
  components: {
      TableBlock
  },
  data: function() {
      return {
          tableValues: []
      }
  },
   created() {
    this.tableValues = [];
    for (var i = 0; i < 81; i++) {
      this.tableValues.push(i);
    }
  }
}
</script>

<style scoped>

.tb-block {
  margin: auto;
}
</style>
