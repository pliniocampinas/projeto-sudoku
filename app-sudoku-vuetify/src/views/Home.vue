<template>
 <v-container
        class="fill-height container-home"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center" 
            :lg="8"
            :md="8"
            :sm="12"
          >
            <h1 class="h1-home-sudoku"> Sudoku Taburo </h1>
            <sudoku-table ref="tableRef"/>
            <control-panel @resolver="submitTable"/>

            <v-overlay
              :absolute="absolute"
              :value="overlay"
            >
              <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
          </v-col>

        </v-row>

        <hr>

        <v-row
          align="center"
          justify="center">
          <v-col
            :lg="8"
            :md="8"
            :sm="12"
          >
            <div ref="resultRoot"></div>
          </v-col>
        </v-row>
 </v-container>
</template>

<script>
// @ is an alias to /src
import SudokuTable from '@/components/SudokuTable';
import ControlPanel from '@/components/ControlPanel';
import TableWrapper from '@/components/TableWrapper';
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8125/';

import Vue from 'vue';
var SudokuTableClass = Vue.extend(SudokuTable);
var TableWrapperClass = Vue.extend(TableWrapper);

export default {
  name: 'Home',
  components: {
    SudokuTable,
    ControlPanel,
  },
  data: function() {
    return {
      absolute: true,
      overlay: false,
      tableArray: [],
    }
  },
  watch: {
      overlay (val) {
        val && setTimeout(() => {
          this.overlay = false;
        }, 1000)
      },
  },
  methods: {
    submitTable() {
      this.overlay = true;
      let valores = this.$refs.tableRef.table;
      let maxResults = 3;
      axios.get(`/vetor-tabuleiro?table=${valores}&maxResults=${maxResults}`)
        .then( (response) => {
            this.createResultTable(response.data.results);
        })
        .catch(err => console.log(err.response));
    },
    createResultTable(results) {
      let parsedData;
      results.forEach((result) => {
        // for each solution recived...
        parsedData = result.flat();
        // ... a new table with results is created
        var instance = new SudokuTableClass();
        instance.resultModeOn = true;
        instance.setTableValues(parsedData);
        instance.$mount();
        var wrapper = new TableWrapperClass();
        wrapper.$mount();
        wrapper.$el.appendChild(instance.$el);
        this.$refs.resultRoot.appendChild(wrapper.$el);
      });

    },
  }
}
</script>

<style scoped>

.h1-home-sudoku {
  color:white;
  background: rgb(172, 90, 61);
  margin: 3px auto;
  border-radius: 3px;
}

.container-home {
  background: rgb(245, 219, 170);
}

</style>
