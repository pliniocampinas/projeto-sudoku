<template>
  <div id="sudoku-table" class="indigo">
    <div id="container-revert">

      <v-container fluid >


        <v-row class="margin-blocks"  align="center" justify="center">

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock @change="pushToTable" :index="0"/>
            <TableBlock @change="pushToTable" :index="1"/>
            <TableBlock @change="pushToTable" :index="2"/>
            <TableBlock @change="pushToTable" :index="3"/>
            <TableBlock @change="pushToTable" :index="4"/>
            <TableBlock @change="pushToTable" :index="5"/>
            <TableBlock @change="pushToTable" :index="6"/>
            <TableBlock @change="pushToTable" :index="7"/>
            <TableBlock @change="pushToTable" :index="8"/>
          </v-col>

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock @change="pushToTable" :index="9"/>
            <TableBlock @change="pushToTable" :index="10"/>
            <TableBlock @change="pushToTable" :index="11"/>
            <TableBlock @change="pushToTable" :index="12"/>
            <TableBlock @change="pushToTable" :index="13"/>
            <TableBlock @change="pushToTable" :index="14"/>
            <TableBlock @change="pushToTable" :index="15"/>
            <TableBlock @change="pushToTable" :index="16"/>
            <TableBlock @change="pushToTable" :index="17"/>
          </v-col>

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock @change="pushToTable" :index="19"/>
            <TableBlock @change="pushToTable" :index="20"/>
            <TableBlock @change="pushToTable" :index="21"/>
            <TableBlock @change="pushToTable" :index="22"/>
            <TableBlock @change="pushToTable" :index="23"/>
            <TableBlock @change="pushToTable" :index="24"/>
            <TableBlock @change="pushToTable" :index="25"/>
            <TableBlock @change="pushToTable" :index="26"/>
            <TableBlock @change="pushToTable" :index="27"/>
          </v-col>

        </v-row>


        <v-row class="margin-blocks" align="center" justify="center">

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock @change="pushToTable" :index="28"/>
            <TableBlock @change="pushToTable" :index="29"/>
            <TableBlock @change="pushToTable" :index="30"/>
            <TableBlock @change="pushToTable" :index="31"/>
            <TableBlock @change="pushToTable" :index="32"/>
            <TableBlock @change="pushToTable" :index="33"/>
            <TableBlock @change="pushToTable" :index="34"/>
            <TableBlock @change="pushToTable" :index="35"/>
            <TableBlock @change="pushToTable" :index="36"/>
          </v-col>

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock @change="pushToTable" :index="37"/>
            <TableBlock @change="pushToTable" :index="38"/>
            <TableBlock @change="pushToTable" :index="39"/>
            <TableBlock @change="pushToTable" :index="40"/>
            <TableBlock @change="pushToTable" :index="41"/>
            <TableBlock @change="pushToTable" :index="42"/>
            <TableBlock @change="pushToTable" :index="43"/>
            <TableBlock @change="pushToTable" :index="44"/>
            <TableBlock @change="pushToTable" :index="45"/>
          </v-col>

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock @change="pushToTable" :index="46"/>
            <TableBlock @change="pushToTable" :index="47"/>
            <TableBlock @change="pushToTable" :index="48"/>
            <TableBlock @change="pushToTable" :index="49"/>
            <TableBlock @change="pushToTable" :index="50"/>
            <TableBlock @change="pushToTable" :index="51"/>
            <TableBlock @change="pushToTable" :index="52"/>
            <TableBlock @change="pushToTable" :index="53"/>
            <TableBlock @change="pushToTable" :index="54"/>
          </v-col>

        </v-row>


        <v-row class="margin-blocks" align="center" justify="center">

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock @change="pushToTable" :index="55"/>
            <TableBlock @change="pushToTable" :index="56"/>
            <TableBlock @change="pushToTable" :index="57"/>
            <TableBlock @change="pushToTable" :index="58"/>
            <TableBlock @change="pushToTable" :index="59"/>
            <TableBlock @change="pushToTable" :index="60"/>
            <TableBlock @change="pushToTable" :index="61"/>
            <TableBlock @change="pushToTable" :index="62"/>
            <TableBlock @change="pushToTable" :index="63"/>
          </v-col>

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock @change="pushToTable" :index="64"/>
            <TableBlock @change="pushToTable" :index="65"/>
            <TableBlock @change="pushToTable" :index="66"/>
            <TableBlock @change="pushToTable" :index="67"/>
            <TableBlock @change="pushToTable" :index="68"/>
            <TableBlock @change="pushToTable" :index="69"/>
            <TableBlock @change="pushToTable" :index="70"/>
            <TableBlock @change="pushToTable" :index="71"/>
            <TableBlock @change="pushToTable" :index="72"/>
          </v-col>

          <v-col :lg="4" :md="4" :sm="3" class="row-wrap-contrainer">
            <TableBlock @change="pushToTable" :index="73"/>
            <TableBlock @change="pushToTable" :index="74"/>
            <TableBlock @change="pushToTable" :index="75"/>
            <TableBlock @change="pushToTable" :index="76"/>
            <TableBlock @change="pushToTable" :index="77"/>
            <TableBlock @change="pushToTable" :index="78"/>
            <TableBlock @change="pushToTable" :index="79"/>
            <TableBlock @change="pushToTable" :index="80"/>
            <TableBlock @change="pushToTable" :index="81"/>
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
          table: this.createTable(()=> 0),
      }
  },
  created() {
    // this.tableValues = [];
    // for (var i = 0; i < 81; i++) {
    //   this.tableValues.push(i);
    // }
  },
  methods: {
    createTable: (cellFactory) => {
    const table = [];
    for (var i = 0; i < 81; i++)
      table.push(cellFactory(i));
    return table;
    },
    pushToTable: function(value, index) {
      this.table[index] = value;
    }
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
