<template>
  <div id="common">
    <headers></headers>
    <router-view></router-view>
    <footers></footers>
  </div>
</template>

<script>
import Headers from '../components/Headers';
import Footers from '../components/Footers';

export default {
  name: 'common',
  components: {
    Headers,
    Footers
  }
}
</script>

<style>

</style>
