<template>
  <div id="sudoku-table">
      <v-container>

        <v-row class="margin-blocks"
          v-for="(index) in 9"
          v-bind:key="index"
        >
          <v-col-1 class="tb-block"
              v-for=" (innerIndex) in 9"
              v-bind:key="innerIndex+index*9"
          >
            <TableBlock               
              v-bind:value="tableValues[(innerIndex - 1) + (index - 1)*9]"
              v-bind:index="(innerIndex - 1) + (index - 1)*9"
            />
          </v-col-1>
        </v-row>
      </v-container>
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

#sudoku-table {
  /* border: 1px solid black; */
  background-color: blue;
}
.tb-block {
  margin: auto;
  max-width: 8.5%;
}

.margin-blocks {
  margin-top: 2%;
}
</style>
