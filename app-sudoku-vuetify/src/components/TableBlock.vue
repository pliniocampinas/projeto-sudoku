<template>
  <div id="sudoku-block">

    <template v-if="resultModeOn">
      <div class="input-container" :class="bordas(index)">
        <input type="number"  @change="onChange" :value="pValue" class="rounded-input">
      </div>
    </template>

    
    <template v-else>
      <div class="input-container" :class="bordas(index)">
        <input type="number"  @change="onChange" v-model="value"  class="rounded-input">
      </div>
    </template>
    
  </div>
</template>


<script>

export default {
  name: 'TableBlock',
  props: {
      index: Number,
      pValue: Number,
      resultModeOn: {
        type: Boolean,
        default: false
      },
  },
  data: function() {
    return {
      value: 0,
    }
  },
  methods: {
    onChange() {
      this.$emit(
        'change',
        this.index,
        this.value,
        (valid) => {
          if(!valid) {
            this.value = 0;
          }
        });
    },
    bordas: function(index) {
      let classes = [];
      
      // Line 3
      if(index >= 18 && index <= 26)
        classes.push('bot-border');
      // Line 6
      if(index >= 45 && index <= 53)
        classes.push('bot-border');

      // Colunm 3 Colunm 6
      if( (index%9 == 2) || (index%9 == 5) )
        classes.push('right-border');

      return classes;
    }
  }
}
</script>

<style scoped>

/* #sudoku-table {
    background-color: blue;
} */
#sudoku-block  {
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  opacity: 1;
}


.input-sudoku input {
  text-align: center;
  color: red;
  overflow: visible;
} 

.input-container input {
  max-width: 90%;
  margin: 3%;
  height: 93%;
  max-height: 93%;

  text-align: center;
  font-weight: bolder;
  border-radius: 15%;
  border: 3px solid #2d9fd9;
}

.bot-border {
  border-bottom: 6px solid #2d9fd9;
}

.right-border {
  border-right: 6px solid #2d9fd9;
}



</style>
