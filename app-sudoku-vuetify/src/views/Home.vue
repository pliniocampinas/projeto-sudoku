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
            <control-panel v-on:resolver="overlay = true"/>

            <v-overlay
              :absolute="absolute"
              :value="overlay"
            >
              <v-progress-circular indeterminate size="64"></v-progress-circular>
            </v-overlay>
          </v-col>

        </v-row>
 </v-container>
</template>

<script>
// @ is an alias to /src
import SudokuTable from '@/components/SudokuTable'
import ControlPanel from '@/components/ControlPanel'

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
          console.log(this.$refs.tableRef.tableValues);
          this.overlay = false;
        }, 1000)
      },
  },
}
</script>
