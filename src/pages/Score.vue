<template lang="pug">
  div.score
    div.title 共25场 已赛5场
      span 1月23日 星期五
        i
    PullTo.match-list(:bottom-load-method="loadBottom")
      ul
        li.match-item.b-1px-t(v-for="item in showData")
          div.home-team.fl
            div(:class="`${item.hostScore >= item.guestScore ? 'win' : 'loser'}`")
              span.img-box
                img(:src="item.hostTeamLogo" alt="" @error.once="setDefaultImg($event, 44)")
              span.name {{ item.hostTeam }}
            div(:class="`${item.guestScore >= item.hostScore ? 'win' : 'loser'}`")
              span.img-box
                img(:src="item.guestTeamLogo" alt="" @error.once="setDefaultImg($event, 44)")
              span.name {{ item.guestTeam }}

          div.match-score.num
            p(:class="`${item.hostScore >= item.guestScore ? 'win' : 'loser'}`") {{item.hostScore}}
            span(:class="`${item.guestScore >= item.hostScore ? 'win' : 'loser'}`") {{item.guestScore}}
          div.fr.detail.tr
            p 详情
            span {{ `${item.league}${dataType === 0 ? '第' + item.round + '轮' : item.round}` }}
</template>

<script>
import PullTo from 'vue-pull-to'
import {mapState, mapActions} from 'vuex'
export default {
  data () {
    return {
      soccerPage: 1,
      basketballPage: 1,
      today: ""
    }
  },
  components: {
    PullTo
  },
  computed: {
    ...mapState([
      "history",
      "dataType",
      "basketballHistory",
      "limit"
    ]),
    showData () {
      return this.dataType === 0
      ? this.history
      : this.basketballHistory
    }
  },
  watch: {
    dataType (val) {
      let today = new Date();
      let arr = val === 0 ? this.history : this.basketballHistory;
      if (!arr || !arr.length) {
        val === 0
        ? this.getHistory({page: this.page, limit: this.limit}).then(res => {
          this.$store.commit("setStateValue", {name: 'history', value: res.contents})
        })
        : this.getBasketballHistory({eventDate: this.today, isAll: 1, pageNum: this.page, pageSize: this.limit}).then(res => {
          this.$store.commit("setStateValue", {name: 'basketballHistory', value: res.event})
        })
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions([
      "getHistory",
      "getBasketballHistory"
    ]),
    loadBottom (loaded) {
      if (this.dataType === 0) {
        this.getHistory({page: ++this.soccerPage, limit: this.limit})
          .then(res => {
            if (res.contents) {
              this.$store.commit('setStateValue', {name: 'history', value: this.history.concat(res.contents)})
            }
            loaded('done')
          })
          .catch(err => {
            loaded('fail')
          })
      } else {
        this.getBasketballHistory({eventDate: this.today, isAll: 1, pageSize: this.basketballPage, pageNum: this.limit})
          .then(res => {
            this.$store.commit('setStateValue', {name: 'basketballHistory', value: this.basketballHistory.concat(res.event)})
            loaded('done')
          })
          .catch(err => {
            loaded('fail')
          })
      }
    },
    init () {
      this.today = this.util.dateFormate(new Date(), "yyyy-MM-dd");
      this.dataType === 0
      ? this.getHistory({page: this.page}).then(res => {
        this.$store.commit("setStateValue", {name: 'history', value: res.contents})
      })
      : this.getBasketballHistory({eventDate: this.today, isAll: 1, pageNum: this.page, pageSize: 10})
      .then(res => {
        this.$store.commit("setStateValue", {name: 'basketballHistory', value: res.event})
      })

    },
    setDefaultImg (e, num) {
      this.util.setDefaultImg(e, num)
    },
  }
}
</script>

<style lang="scss" scoped>
.score {
  background: #fff;
  display: flex;
  flex-direction: column;
  .title {
    padding: 0 20px;
    height: 88px;
    line-height: 88px;
    font-size: 24px;
    position: relative;
    color: $fcolor;
    z-index: 2;
    background: #fff;
    span {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      color: $fc1;
      i {
        display: inline-block;
        width: 28px;
        height: 28px;
        background-image: url('~common/images/events/btn_calendar.png');
        background-repeat: no-repeat;
        background-size: cover;
        margin-left: 20px;
        transform: translateY(2px);
      }
    }
  }
  .match-list {
    flex: 1;
    .match-item {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: space-between;
      padding: 32px 20px 36px 0;
      background: #fff;
      .win {
        color: $fc1;
      }
      .loser {
        color: $fcolor;
      }
      .home-team {
        width: 320px;
        font-size: 28px;
        flex: 5;
        div:last-child {
          margin-top: 12px;
        }
      }
      .img-box, .match-score, .detail{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .img-box {
        display: inline-block;
        width: 80px;
        height: 44px;
        vertical-align: middle;
        text-align: center;
        img {
          height: 100%;
        }
      }
      .match-score {
        flex: 1;
        font-size: 42px;
        text-align: center;
      }
      .detail {
        flex: 4;
        font-size: 24px;
        line-height: 40px;
        span {
          display: inline-block;
          color: $fcolor;
        }
      }
    }
  }
}
</style>
