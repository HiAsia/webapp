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

</template>

<script>
export default {
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
