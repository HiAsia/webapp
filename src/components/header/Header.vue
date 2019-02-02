<template lang="pug">
div.header
  div.menu.fl(@click.stop="show") {{ this.dataType === 0 ? "足球" : "篮球" }}
    i
    div.show-tab(v-show="showTab")
      div(@click.stop="changeType(0)") 足球
      div(@click.stop="changeType(1)") 篮球

  nav.fr
    RouterLink(to="/" active-class="active" exact) 赛程
    RouterLink(to="/score" active-class="active") 战报
    RouterLink(to="/events" active-class="active") 赛事
</template>

<script>
import {mapState, mapGetters, mapMutations} from 'vuex'
export default {
  data () {
    return {
      showTab: false,
    }
  },
  computed: {
    ...mapState([
      "dataType",
    ]),
    ...mapGetters([
      "showList"
    ])
  },
  methods: {
    ...mapMutations([
      "setStateValue"
    ]),
    show () {
      this.showTab = true;
    },
    changeType (index) {
      if (this.dataType === index) return;
      this.showTab = false;
      this.setStateValue({name: 'dataType', value: index});
    }
  },
  created () {
    document.onclick = () => {
      this.showTab = false;
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
  font-size: 30px;
  .menu {
    padding: 0 30px;
    position: relative;
    .show-tab {
      position: absolute;
      bottom: 0;
      left: 10px;
      background: #fff;
      width: 100%;
      text-align: center;
      color: $fc1;
      transform: translateY(100%);
      border-radius: 4px;
      line-height: 60px;
      font-size: 24px;
      &:before {
        content: "";
        position: absolute;
        top: -6px;
        left: 30%;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 6px solid #fff;
      }
    }
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
        &:after {
          transform: scale(1);
        }
      }
    }
  }
}
</style>
