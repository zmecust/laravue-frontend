<template>
    <div class="payment">
        <p class="first">$打赏</p>
        <p>社区的维护需要money，各位心情好就施舍点吧</p>
        <img src="../../assets/payment.png" alt="">
    </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
    .payment {
        color: #555;
        line-height: 30px;
        text-align: center;
        img {
            width: 25%;
        }
        .first {
            font-size: 25px;
            padding: 40px 0 10px;
        }
        p {
            padding: 10px 0 20px;
        }
    }
</style>