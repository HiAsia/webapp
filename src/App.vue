<template lang="pug">
div#app
  XmHeader.head
  RouterView.main
</template>
<script>
  import XmHeader from 'components/header/Header'
  export default {
    components: {
      XmHeader
    }
  }
</script>
<style lang="scss">
#app {
  height: 100%;
  .head {
    height: 88px;
    width: 100%;
    z-index: 99;
    position: fixed;
  }
  .main {
    padding-top: 88px;
    height: 100%;
    box-sizing: border-box;
  }
}
</style>
