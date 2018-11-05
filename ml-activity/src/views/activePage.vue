<template>
  <div class="page_container">
    活动
  </div>
</template>

<script>
export default {
  name: 'activePage',
  components: {

  },
  props: {
    params: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      urlSearchParams: {}
    }
  },
  created () {
    this.urlSearchParams = this.params
  },
  mounted () {

  },
  methods: {

  },
  watch: {
    params: {
      immediate: true,
      handler: function (val = {}) {
        this.urlSearchParams = val
      }
    }
  }
}
</script>

<style>

</style>
