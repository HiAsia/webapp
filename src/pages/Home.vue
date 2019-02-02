<template lang="pug">
PullTo.home(:bottom-load-method="loadBottom" :bottom-config="bottomConfig")
  div.competition
    div.competition-detail
      table(v-if="showLive[0]")
        tr
          td
            img(:src="showLive[0].hostTeamLogo" alt="" @error.once="setDefaultImg($event, 144)")
          td.score-detail
            h4 {{ `${showLive[0].league }${typeof showLive[0].round === 'string' ? showLive[0].round : '第' + showLive[0].round + '轮'}` }}
            span.date.num {{ getTime(showLive[0].matchTimeStamp) }}
          td
            img(:src="showLive[0].guestTeamLogo" alt="" @error.once="setDefaultImg($event, 144)")
        tr.text
          td {{ showLive[0].hostTeam }}
          td 今日
          td {{ showLive[0].guestTeam }}
      div.btn
        img(src="~common/images/sprite/icon_status.png")
        |对阵数据
  div.swiper-container
    div.swiper-wrapper
      swiper(:options="swiperOption" ref="mySwiper")
        swiperSlide(v-for="slide in showLive" :key="slide.matchId")
          div.team
            p.fl
              span.img-box
                img(:src="slide.hostTeamLogo" alt="" @error.once="setDefaultImg($event, 40)")
              span.name.ellipsis {{ slide.hostTeam }}
            span.fr {{ slide.hostScore }}
          div.team
            p.fl
              span.img-box
                img(:src="slide.guestTeamLogo" alt="" @error.once="setDefaultImg($event, 40)")
              span.name.ellipsis {{ slide.guestTeam }}
            span.fr {{ slide.guestScore }}
          div.message
            p(title="英超第23轮").round.ellipsis {{ `${slide.league }${'第' + slide.round + '轮'}` }}
            p.live.fr
              span(:class="{cr: slide.matchState > 0}") {{ slide.matchState > 0 ? "直播中" : "未开赛" }}
  div.today-match.mt10
    div.title 今日赛程
      i.fr
    div.match-list
      div.match-item.b-1px-t.clear(v-for="match in showList" :key="match.matchId")
        div.fl.team.b-1px-r
          p.home-team
            span.img-box
              img(:src="match.hostTeamLogo" alt="" @error.once="setDefaultImg($event, 40)")
            span.name {{ match.hostTeam }}
            span.fr.match-date 05:30
          p.guest-team
            span.img-box
              img(:src="match.guestTeamLogo" alt="" @error.once="setDefaultImg($event, 40)")
            span.name {{ match.guestTeam }}
        div.fr.live.tr
          img.video(src="~common/images/sprite/video.png" alt="" @error.once="setDefaultImg($event, '35x25')")
          span 视频直播
          p.tr.ellipsis {{ `${match.league }${'第' + match.round + '轮'}` }}

</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import {mapState, mapGetters, mapActions} from 'vuex'
import PullTo from 'vue-pull-to'
import 'swiper/dist/css/swiper.css'
export default {
  data () {
    return {
      swiperOption: {
        slidesPerView: 'auto'
      },
      today: "",
      scroll: "",
      soccerPage: 1,
      basketballPage: 1,
      soccerPageTotal: "",
      basketballPageTotal: "",
      bottomConfig: {
        pullText: '下拉刷新'
      }
    }
  },
  watch: {
    dataType (val) {
      if (val === 1 && !this.showList.length) {
        this.getBasketballData({eventDate: this.today, pageNum: 1, pageSize: this.limit, isAll: 1})
      }
    }
  },
  computed: {
    ...mapState([
      'soccerList',
      'soccerLiveList',
      'basketballList',
      'basketballLiveList',
      'dataType',
      'limit'
    ]),
    showList () {
      return this.dataType === 0 ? this.soccerList : this.basketballList
    },
    showLive () {
      return this.dataType === 0 ? this.soccerLiveList : this.basketballLiveList
    }
  },
  components: {
    swiper,
    swiperSlide,
    PullTo
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions([
      'getSoccerList',
      'getSoccerLiveList',
      'getBasketballList',
      'getBasketballLive'
    ]),
    loadBottom (loaded) {
      if (this.dataType === 0) {
        if (typeof this.soccerPageTotal === "number" && ++this.soccerPage > this.soccerPageTotal) {
          loaded('done')
          return this.bottomConfig.pullText = "没有更多数据了...";
        }
        this.getSoccerList({matchDate: this.today, page: ++this.soccerPage, limit: this.limit})
          .then(res => {
            if (res.contents) {
              this.$store.commit('setStateValue', {name: 'soccerList', value: this.soccerList.concat(res.contents)})
            }
            loaded('done')
          })
          .catch(err => {
            loaded('fail')
          })
      } else {
        if (typeof this.basketballPageTotal === "number" && ++this.basketballPage > this.basketballPageTotal) {
          loaded('done')
          return this.bottomConfig.pullText = "没有更多数据了...";
        }
        this.getBasketballList({eventDate: this.today, isAll: 1, pageSize: this.basketballPage, pageNum: this.limit})
          .then(res => {
            this.$store.commit('setStateValue', {name: 'basketballList', value: this.basketballList.concat(res.event)})
            .loaded('done')
          })
          .catch(err => {
            loaded('fail')
          })
      }
    },
    init () {
      this.today = this.util.dateFormate(new Date(), "yyyy-MM-dd");
      this.dataType === 0
      ? this.getSoccerData({matchDate: this.today, page: 1, limit: this.limit})
      : this.getBasketballData({eventDate: this.today, page: 1, limit: this.limit})
    },
    getSoccerData (params) {
      this.getSoccerLiveList(params);
      this.getSoccerList(params)
      .then(res => {
        if (res.contents) {
          this.$store.commit('setStateValue', {name: 'soccerList', value: res.contents})
          this.soccerPageTotal = Math.ceil(res.page.total/res.page.pageSize);
        }
      })
    },
    getBasketballData (params) {
      this.getBasketballLive(params);
      this.getBasketballList(params)
      .then(res => {
        this.$store.commit('setStateValue', {name: 'basketballList', value: res.event})
        this.basketballPageTotal = Math.ceil(res.page.total/res.page.limit);
      })
    },
    getTime (time) {
      let date = new Date(time);
      return this.util.dateFormate(date, "hh:mm");
    },
    setDefaultImg (e, num) {
      this.util.setDefaultImg(e, num)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  background-color: #f2f3f4;
  .hidden {
    height: 88px;
  }
  .competition {
    height: 390px;
    box-sizing: border-box;
    padding-top: 82px;
    background-image: url("~common/images/index_matchbg_football.png");
    background-repeat: no-repeat;
    background-size: cover;
    position: relative;
    .competition-detail {
      .btn {
        width: 260px;
        height: 70px;
        line-height: 70px;
        background: $blue;
        color: white;
        font-size: 24px;
        border-radius: 36px;
        text-align: center;
        position: absolute;
        bottom: 25px;
        left: 50%;
        margin-left: -130px;
        img {
          width: 44px;
          vertical-align: middle;
          margin-right: 10px;
        }
      }
      table {
        width: 100%;
        text-align: center;
        color: white;
        img {
          height: 144px;
        }
        td {
          vertical-align: middle;
          width: 30%;
        }
        .text {
          td{
            padding-top: 20px;
          }
        }
      }
      .score-detail {
        .date {
          font-size: 98px;
          display: inline-block;
          margin-top: 22px;
        }
      }
    }
  }
  .swiper-container {
    height: 188px;
    background: #fff;
    min-width: 100%;
    .swiper-slide {
      width: 320px;
      box-sizing: border-box;
      padding: 30px 36px 30px 0px;
      color: $fcolor;
      position: relative;
      &:after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        width: 1PX;
        height: 114px;
        background: $borderColor;
        transform: translateY(-50%);
      }
      .team {
        height: 40px;
        line-height: 40px;
        font-size: 24px;
        color: $fc1;
        &:first-child {
          margin-bottom: 14px;
        }
        .img-box {
          display: inline-block;
          width: 80px;
          text-align: center;
        }
        img {
          height: 40px;
          vertical-align: middle;
        }
        .name {
          width: 160px;
          display: inline-block;
          vertical-align: middle;
        }
      }
      .message {
        font-size: 20px;
        margin-top: 14px;
        padding-left: 20px;
        p {
          display: inline-block;
        }
        .round {
          width: 180px;
        }
        .live {
          width: 80px;
          text-align: right;
        }
      }
    }
  }
  .today-match {
    color: $fc1;
    background: #fff;
    .title {
      height: 88px;
      line-height: 88px;
      font-size: 30px;
      padding: 0 20px;
      position: relative;
      i {
        display: inline-block;
        width: 40px;
        height: 40px;
        background-image: url("~common/images/more.png");
        background-repeat: no-repeat;
        background-size: cover;
        position: absolute;
        right: 10px;
        top: 50%;
        margin-top: -20px;
      }
    }
    .match-list {
      height: calc(100% - 770px);
      .match-item {
        padding: 35px 20px;
        padding-left: 0;
        .team {
          display: inline-block;
          width: 450px;
          .home-team{
            display: inline-block;
            margin-bottom: 14px;
          }
          p {
            color: $fc1;
            padding-right: 50px;
            height: 40px;
            line-height: 40px;
            width: 100%;
            box-sizing: border-box;
            .name {
              font-size: 28px;
            }
            .match-date {
              font-size: 24px;
            }
            .img-box {
              width: 80px;
              display: inline-block;
              height: 40px;
              vertical-align: middle;
              text-align: center;
            }
            img {
              height: 100%;
              max-width: 56px;
            }
          }

        }
        .live {
          img.video {
            width: 35px;
            margin-right: 20px;
            transform: translateY(4px)
          }
          span {
            color: $fc1;
            font-size: 24px;
          }
          p {
            width: 250px;

            color: $fcolor;
            font-size: 20px;
            margin-top: 30px;
          }
        }
      }
    }
  }
}
</style>
