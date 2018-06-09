<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style>
#app {
  margin: 0 auto;
  width: 1080px;
}

::-webkit-scrollbar {
width: 5px;
}

::-webkit-scrollbar-button {
width: 5px;
height: 5px;
}

::-webkit-scrollbar-track {
border-radius: 0px;
}

::-webkit-scrollbar-thumb {
background: #999;
border-radius: 0px;
}

::-webkit-scrollbar-thumb:hover {
background: #7d7d7d;
}
</style>
