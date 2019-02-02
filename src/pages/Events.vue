<template lang="pug">
div.events
  div.search
    i.icon.mr10
    span 按国家名称搜索
  div.content
    div.special
      i
      |特别关注
    div.special-list
      div.item(v-for="item in list")
        div
          img(src="~common/images/events/icon_exp1.png" alt="" @error.once="setDefaultImg($event, 58)")
          p 英超
    div.hot
      i
      |热门赛事
    div.hot-list
      div.item(v-for="item in list")
        div
          img(src="~common/images/events/icon_exp1.png" alt="" @error.once="setDefaultImg($event, 58)")
          p 英超
    div.country
      i
      |国家赛事
    div.country-list
      div.item(v-for="country in countryList") {{ country.country }}

</template>

<script>
import countryList from 'common/mock/countryList.js';
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      list: new Array(8)
    }
  },
  computed: {
    ...mapState([
      "countryList"
    ])
  },
  methods: {
    ...mapActions([
      "getCountryList"
    ]),
    setDefaultImg (e, num) {
      this.util.setDefaultImg(e, num)
    },
  },
  created () {
    this.getCountryList();
  },
}
</script>

<style lang="scss" scoped>
.events {
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  .search {
    text-align: center;
    background: #fff;
    border-radius: 28px;
    margin: 30px auto 40px;
    width: 710px;
    height: 58px;
    line-height: 58px;
    font-size: 28px;
    color: $fcolor;
    .icon {
      display: inline-block;
      width: 28px;
      height: 28px;
      background-image: url('~common/images/events/searchbar_icon_search.png');
      background-repeat: no-repeat;
      background-size: cover;
      transform: translateY(2px);
    }
  }
  .content {
    .special, .hot, .country {
      display: flex;
      height: 30px;
      line-height: 30px;
      font-size: 28px;
      color: $fc1;
      margin-bottom: 10px;
      i {
        display: inline-block;
        height: 28px;
        width: 28px;
        background-size: cover;
        margin-right: 20px;
      }
    }
    .special i {
      background-image: url('~common/images/events/icon_foucus.png');
    }
    .hot i {
      background-image: url('~common/images/events/icon_hot.png');
    }
    .country i {
      background-image: url('~common/images/events/icon_country.png')
    }
    .country-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 40px;
      .item {
        margin-top: 20px;
        width: 162px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        background: #fff;
        border-radius: 4px;
      }
    }
    .special-list, .hot-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-bottom: 40px;
      .item {
        margin-top: 20px;
        width: 162px;
        height: 162px;
        text-align: center;
        background: #fff;
        position: relative;
        img {
          height: 58px;
          margin-bottom: 20px;
        }
        div {
          width: 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
}
</style>
