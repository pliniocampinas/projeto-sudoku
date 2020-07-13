<template>
  <div id="app">
    <Header />
    <div class="container">
      <div class="row">
        <sudoku-table />
      </div>
      <div class="row">
        <control-panel />
      </div>
    </div>
  </div>
</template>


<script>
import SudokuTable from './components/SudokuTable.vue'
import ControlPanel from './components/ControlPanel.vue'
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    SudokuTable,
    ControlPanel,
    Header
  }
}
</script>

<style>

div {
  border: 1px solid black;
}

</style>
