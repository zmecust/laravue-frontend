<template>
  <div class="wrapper">
    <div class="error-spacer"></div>
    <div role="main" class="main">
      <h1>I think we're lost.</h1>
      <h2>Server Error: 404 (Not Found)</h2>
      <hr>
      <h3>What does this mean?</h3>
      <p>
        We couldn't find the page you requested on our servers. We're really sorry about that. It's our fault, not yours. We'll work hard to get this page back online as soon as possible.
      </p>
      <p>
        Perhaps you would like to go to our
        <a href="/">home page</a>?
      </p>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>
body {
  font-family: 'Droid Sans', sans-serif;
  font-size: 10pt;
  color: #555;
  line-height: 25px;
}

.wrapper {
  line-height: 35px;
  width: 760px;
  margin: 0 auto 5em auto;
}

.main {
  overflow: hidden;
}

.error-spacer {
  height: 4em;
}

h2 {
  padding: 10px 0 20px;
}

h3 {
  padding: 20px 0 20px;
}

a, a:visited {
  color: #00b5ad;
}

a:hover {
  color: #00b5ad;
}
</style>