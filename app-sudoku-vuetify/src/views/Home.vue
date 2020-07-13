<template>
 <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col class="text-center">
            <h1> Alou brasil</h1>
            <sudoku-table/>
            <control-panel/>
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
  }
}
</script>
