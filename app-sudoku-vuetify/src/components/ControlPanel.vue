<template>
    <div id="control-panel-container">
        <v-container >
            <v-row>
                <button class="cp-btn" style="float:left" @click="resolver">Resolver</button>
                <button class="cp-btn" style="float:right" >Limpar</button>
            </v-row>
        </v-container>
    </div>
</template>


<script>

export default {
  name: 'ControlPanel',
  methods: {
      resolver: function() {
          this.$emit('resolver');
      }
  }
}
</script>

<style scoped>

#control-panel-container {
    height: 100px;
    padding: 0px; 
}

.cp-btn {
    margin: 0 auto;
    max-width: 45%;
    width: 45%;
    height: 9vh;
    background: #F78764;
    color: #EBEBD3;
    font-size: x-large;
    font-weight: bolder;
    box-shadow: 7px 7px 3px rgba(116, 113, 113, 0.8);
    background-color: rgba(116, 113, 113, 1);
    border: 1px solid rgba(116, 113, 113, 0.8);
    box-sizing: border-box;
    border-radius: 4px;
    outline: none;
}

.cp-btn:hover {
    opacity: 0.7;
}
</style>
