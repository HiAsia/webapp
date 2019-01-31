<template lang="pug">
div.home
  div.competition
    div.competition-detail
      table
        tr
          td
            img(src="~common/images/home-team.png" alt="" @onerror="setDefaultImg($event)")
          td.score-detail
            h4 英超第23轮
            span.date.num 03:30
          td
            img(src="~common/images/guest-team.png" alt="" @onerror="setDefaultImg($event)")
        tr.text
          td 切尔西
          td 今日
          td 马德里竞技
      div.btn
        img(src="~common/images/sprite/icon_status.png")
        |对阵数据
  swiper(:options="swiperOption")
    swiperSlide(v-for="slide in list" :key="slide.matchId")
      |{{ slide.hostTeam }}
</template>

<script>
// let obj = {
//         "matchTimeStamp": 1548865800,
//         "hostScore": 1,
//         "guestTeamLogo": "https://s.tysondata.com/team/",
//         "league": "塔吉克斯坦杯",
//         "hostTeamLogo": "https://s.tysondata.com/team/",
//         "matchState": -1,
//         "matchTime": "2019-01-31 00:30:00",
//         "hostTeamId": "2345077",
//         "hostTeam": "库克涛斯",
//         "guestTeamId": "2263996",
//         "guestScore": 3,
//         "round": "",
//         "guestTeam": "维达耶",
//         "matchId": "104910589"
//       }
import {swiper, swiperSlide} from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import list from 'common/moke/soccerList.js';
export default {
  data () {
    return {
      list: list,
      swiperOption: {　　　　　
        // autoplay:true,//自动切换
        // pagination: {
        //   el: '.swiper-pagination'//分页器
        // }
      }
    }
  },
  components: {
    swiper,
    swiperSlide
  },
  methods: {
    setDefaultImg (e) {
      this.util.setDefaultImg(e, 144)
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
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
}
</style>
