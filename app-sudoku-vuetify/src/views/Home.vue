<template>
 <v-container
        class="fill-height"
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
            <h1> Alou brasil</h1>
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

        <v-row>
          <v-col>
            <div ref="resultRoot"></div>
          </v-col>
        </v-row>
 </v-container>
</template>

<script>
// @ is an alias to /src
import SudokuTable from '@/components/SudokuTable';
import ControlPanel from '@/components/ControlPanel';
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8125/';

import Vue from 'vue';
var SudokuTableClass = Vue.extend(SudokuTable);

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
          console.log(this.$refs.tableRef.table);
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
            console.log("response");
            console.log(response.data);
            this.createResultTable(response.data.results);
        })
        .catch(err => console.log(err));
    },
    createResultTable(results) {
      let parsedData;
      results.forEach((result) => {
        // for each solution recived...
        parsedData = result.flat();
        // ... a new table with results is created
        var instance = new SudokuTableClass();
        instance.$mount();
        this.$refs.resultRoot.appendChild(instance.$el);
        instance.tableValues = parsedData;
        console.log("parsedData");
        console.log(parsedData);
      });

    }
  }
}
</script>
