<template>
  <div class="cellBox">
    <div class="placeholder" v-show="!value || value.length === 0">{{placeholder}}</div>
    <div class="cellName" v-show="value">{{valueName}}</div>
  </div>
</template>

<script>
  import value2name from './value2name'
  export default {
    props: {
      placeholder: {
        default: '请选择'
      },
      value: {
        default: ''
      },
      join: {
        type: String,
        default: ','
      },
      data: {
        default() {
          return []
        }
      }
    },
    mounted(){
      this.getValue()
    },
    data() {
      return {
        valueName: ''
      }
    },
    methods: {
      getValue() {
        this.valueName = value2name(this.value, this.data, this.join)
      }
    },
    watch: {
      value(val) {
        this.value = val
        this.getValue()
      },
      data(val) {
        this.data = val
        this.getValue()
      }
    }
  }
</script>

<style scoped lang="less">
  .cellBox {
    .cellName {
      color: #000;
    }
  }
</style>
  