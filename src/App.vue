<template>
  <div id="app">
    <headers></headers>
    <router-view></router-view>
    <footers></footers>
  </div>
</template>

<script>
  import Headers from './components/Headers'
  import Footers from './components/Footers'

  export default {
    name: 'app',
    components: {
      Headers,
      Footers
    }
  }
</script>

<style>
#app {
}
</style>
