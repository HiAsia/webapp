<template lang="pug">
div.header
  div.menu.fl 足球
    i
  nav.fr
    RouterLink(to="/" active-class="active" exact) 赛程
    RouterLink(to="/score" active-class="active") 战报
    RouterLink(to="/events" active-class="active") 赛事
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  height: 88px;
  line-height: 88px;
  background: $blue;
  color: white;
  font-size: 32px;
  .menu {
    padding: 0 30px;
    font-weight: bold;
    i {
      display: inline-block;
      width: 16px;
      height: 10px;
      background-image: url("../../common/images/sprite/down.png");
      background-repeat: no-repeat;
      background-size: cover;
      margin-left: 12px;
      vertical-align: middle;
    }
  }
  nav {
    a {
      display: inline-block;
      color: #CBE0FA;
      padding: 0 25px;
      height: 100%;
      position: relative;
      &:after {
        content: "";
        width: 32px;
        height: 4px;
        background: #fff;
        position: absolute;
        bottom: 15px;
        left: 50%;
        margin-left: -16px;
        transform: scale(0);
        transition: .2s;
      }
      &.active {
        color: white;
        font-weight: bold;
        &:after {
          transform: scale(1);
        }
      }
    }
  }
}
</style>
