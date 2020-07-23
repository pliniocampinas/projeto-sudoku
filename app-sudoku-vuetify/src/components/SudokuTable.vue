<template>
  <div id="sudoku-table" class="indigo">
    <div id="container-revert">

      <v-container fluid >


        <v-row class="margin-blocks"  align="center" justify="center">

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock :index="tableObjects[0]"/>
            <TableBlock :index="tableObjects[1]"/>
            <TableBlock :index="tableObjects[2]"/>
            <TableBlock :index="tableObjects[3]"/>
            <TableBlock :index="tableObjects[4]"/>
            <TableBlock :index="tableObjects[5]"/>
            <TableBlock :index="tableObjects[6]"/>
            <TableBlock :index="tableObjects[7]"/>
            <TableBlock :index="tableObjects[8]"/>
          </v-col>

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock :index="tableObjects[9]"/>
            <TableBlock :index="tableObjects[10]"/>
            <TableBlock :index="tableObjects[11]"/>
            <TableBlock :index="tableObjects[12]"/>
            <TableBlock :index="tableObjects[13]"/>
            <TableBlock :index="tableObjects[14]"/>
            <TableBlock :index="tableObjects[15]"/>
            <TableBlock :index="tableObjects[16]"/>
            <TableBlock :index="tableObjects[17]"/>
          </v-col>

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock  :index="tableObjects[19]"/>
            <TableBlock  :index="tableObjects[20]"/>
            <TableBlock  :index="tableObjects[21]"/>
            <TableBlock  :index="tableObjects[22]"/>
            <TableBlock  :index="tableObjects[23]"/>
            <TableBlock  :index="tableObjects[24]"/>
            <TableBlock  :index="tableObjects[25]"/>
            <TableBlock  :index="tableObjects[26]"/>
            <TableBlock  :index="tableObjects[27]"/>
          </v-col>

        </v-row>


        <v-row class="margin-blocks" align="center" justify="center">

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock :index="tableObjects[28]"/>
            <TableBlock :index="tableObjects[29]"/>
            <TableBlock :index="tableObjects[30]"/>
            <TableBlock :index="tableObjects[31]"/>
            <TableBlock :index="tableObjects[32]"/>
            <TableBlock :index="tableObjects[33]"/>
            <TableBlock :index="tableObjects[34]"/>
            <TableBlock :index="tableObjects[35]"/>
            <TableBlock :index="tableObjects[36]"/>
          </v-col>

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock :index="tableObjects[37]"/>
            <TableBlock :index="tableObjects[38]"/>
            <TableBlock :index="tableObjects[39]"/>
            <TableBlock :index="tableObjects[40]"/>
            <TableBlock :index="tableObjects[41]"/>
            <TableBlock :index="tableObjects[42]"/>
            <TableBlock :index="tableObjects[43]"/>
            <TableBlock :index="tableObjects[44]"/>
            <TableBlock :index="tableObjects[45]"/>
          </v-col>

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock  :index="tableObjects[46]"/>
            <TableBlock  :index="tableObjects[47]"/>
            <TableBlock  :index="tableObjects[48]"/>
            <TableBlock  :index="tableObjects[49]"/>
            <TableBlock  :index="tableObjects[50]"/>
            <TableBlock  :index="tableObjects[51]"/>
            <TableBlock  :index="tableObjects[52]"/>
            <TableBlock  :index="tableObjects[53]"/>
            <TableBlock  :index="tableObjects[54]"/>
          </v-col>

        </v-row>


        <v-row class="margin-blocks" align="center" justify="center">

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock  :index="tableObjects[55]"/>
            <TableBlock  :index="tableObjects[56]"/>
            <TableBlock  :index="tableObjects[57]"/>
            <TableBlock  :index="tableObjects[58]"/>
            <TableBlock  :index="tableObjects[59]"/>
            <TableBlock  :index="tableObjects[60]"/>
            <TableBlock  :index="tableObjects[61]"/>
            <TableBlock  :index="tableObjects[62]"/>
            <TableBlock  :index="tableObjects[63]"/>
          </v-col>

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock  :index="tableObjects[64]"/>
            <TableBlock  :index="tableObjects[65]"/>
            <TableBlock  :index="tableObjects[66]"/>
            <TableBlock  :index="tableObjects[67]"/>
            <TableBlock  :index="tableObjects[68]"/>
            <TableBlock  :index="tableObjects[69]"/>
            <TableBlock  :index="tableObjects[70]"/>
            <TableBlock  :index="tableObjects[71]"/>
            <TableBlock  :index="tableObjects[72]"/>
          </v-col>

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock  :index="tableObjects[73]"/>
            <TableBlock  :index="tableObjects[74]"/>
            <TableBlock  :index="tableObjects[75]"/>
            <TableBlock  :index="tableObjects[76]"/>
            <TableBlock  :index="tableObjects[77]"/>
            <TableBlock  :index="tableObjects[78]"/>
            <TableBlock  :index="tableObjects[79]"/>
            <TableBlock  :index="tableObjects[80]"/>
            <TableBlock  :index="tableObjects[81]"/>
          </v-col>

        </v-row>


      </v-container>
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
          tableObjects: this.createObjectTable((index) => { return { i: index } })
      }
  },
  computed: {
    tableValues: {
      get: function() {
        return this.createTableArray(this.tableObjects);
      },
      set: function(flattenTable) {
        if(this.tableObjects && flattenTable) {
          flattenTable.forEach(function(item, index) {
            this.tableObjects[index] = item;
          });
        }
      }
    },
  },
  created() {
    // this.tableValues = [];
    // for (var i = 0; i < 81; i++) {
    //   this.tableValues.push(i);
    // }
  },
  methods: {
    createObjectTable: (cellFactory) => {
    const table = [];
    for (var i = 0; i <= 81; i++)
      table.push(cellFactory(i));
    return table;
    },
    createTableArray: (objectTable) => objectTable.map(item => item.i)
  }
}
</script>

<style scoped>

 #sudoku-table {
  /* border: 1px solid black; */
  /* background-color: ; */
  box-shadow: 6px 6px 3px grey; 
  border: 1px solid rgba(116, 113, 113, 0.8);

} 

.efeito-blur-cinza {
  box-shadow: 10px 10px 5px grey;
}

.row-wrap-contrainer {
  border: 3px solid whitesmoke;
  box-shadow: 2px 2px 1px grey;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.75%;
}

</style>
