<template>
  <div id="sudoku-table indigo">
    <div class="flex-container indigo "> 
      
      <template v-if="resultModeOn">
        <div class="cell-container " v-for="(value, index) in table" :key="index">
          <table-block :pValue="value" :resultModeOn="true" :index="index"/>
        </div>
      </template>

      <template v-else>
        <div class="cell-container " v-for="index in 81" :key="index">
          <table-block @change="pushToTable" :index="index-1"/>
        </div>
      </template>

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
  props: {
    resultModeOn: {
      type: Boolean,
      default: false
    },
  },
  data: function() {
      return {
          table: this.createTable(),
      }
  },
  created() {
    // this.tableValues = [];
    // for (var i = 0; i < 81; i++) {
    //   this.tableValues.push(i);
    // }
  },
  methods: {
    createTable: () => {
      const table = [];
      for (var i = 0; i < 81; i++)
        table.push(0);
      return table;
    },
    pushToTable: function(index, value, callback) {
      if(this.validateTable(index, value)) {
        this.table[index] = value;
        callback(true);
      } else {
        this.table[index] = 0;
        callback(false);
      }
    },
    validateTable: function(index, value) {
      if(value > 9 || value < 0) {
        console.log("valor inválido", index, ',', value);
        return false;
      }
      return true;
    },
    setTableValues: function(values) {
      this.table = values.slice();
    },
  }
}
</script>

<style>

 #sudoku-table {
  /* border: 1px solid black; */
  /* background-color: ; */
  box-shadow: 6px 6px 3px grey; 
  border: 4px solid rgba(116, 113, 113, 0.8);
}


.cell-container {
  width: 11% !important;
  height: 40px;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border-radius: 5px;
  padding: 4px 3px 3px 2px;
  border: 1px solid black;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.under-layer-container {
  position: relative;
  width: 100%;
  z-index: 2;
}

.under-layer-block {
  z-index: 2;
  width: 30%;
  height: 120px;
  max-height: 120px;
  border: 5px solid black;
}

.layer-wrapper {
  position: absolute;
  z-index: 2;
  width: 71%;
}


</style>
