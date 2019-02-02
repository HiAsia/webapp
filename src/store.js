import Vue from "vue";
import Vuex from "vuex";
import Axios from 'common/request/http.js'
import path from 'common/config/path.js'

Vue.use(Vuex);

// 统一足球篮球数据格式
function formatData  (obj) {
   return {
      matchId: obj.eventId,
      league: obj.leagueNameJ,
      round: obj.matchStateName,
      matchTime: obj.matchTime,
      hostTeamId:  obj.homeId,
      hostTeam: obj.homeNameJ,
      hostTeamLogo: obj.homeLogo,
      hostScore: obj.homeScore,
      guestTeamId: obj.awayId,
      guestTeam: obj.awayNameJ,
      guestTeamLogo: obj.awayLogo,
      guestScore: obj.awayScore,
      matchState: obj.matchState,
      matchStateName: obj.matchStateName,
      matchTimeStamp: obj.matchTime
    }
}

export default new Vuex.Store({
  state: {
    countryList: [],
    // 足球赛程数据
    soccerList: [],
    // 足球直播数据
    soccerLiveList: [],
    basketballList: [],
    basketballLiveList: [],
    history: [],
    basketballHistory: [],
    // 0表示显示足球数据，1表示显示篮球数据
    dataType: 0,
    limit: 20

  },
  mutations: {
    setStateValue (state, obj) {
      state[obj.name] = obj.value
    }
  },
  actions: {
    getSoccerList ({state, commit}, params) {
      return new Promise((resolve, reject) => {
        Axios.get(path.getSoccerList, {params})
        .then(res => {
          resolve(res)
        })
        .catch (err => {
          reject(err)
        })
      })
    },
    getSoccerLiveList ({commit}, params) {
      Axios.get(path.getSoccerLiveList, {params})
      .then(res => {
        commit("setStateValue", {name: 'soccerLiveList', value: res})
      })
      .catch(err => {
      })
    },
    getBasketballData ({dispatch}, params) {
      dispatch("getBasketballList", params);
      dispatch("getBasketballLive", params)
    },
    getBasketballList ({commit}, params) {
      return new Promise((resolve, reject) => {
        Axios.get(path.getBasketballList, {params})
          .then(res => {
            if (res.event) {
              let arr = res.event.map(obj => formatData(obj))
              resolve({event: arr, page: res.page})
            }
          }).catch(err => {
            reject()
          })
      })
    },
    getBasketballLive ({commit}, params) {
      Axios.get(path.getBasketballRecent, {params: {...params, isAll: 2}})
        .then(res => {
          if (res.event) {
            let arr = res.event.map(obj => formatData(obj));
            commit("setStateValue", {name: 'basketballLiveList', value: arr})
          }
        })
    },
    getCountryList ({commit}, params) {
      Axios.get(path.getCountryList)
      .then(res => {
        commit('setStateValue', {name: 'countryList', value: res})
      })
    },
    getHistory ({commit}, params) {
      return new Promise((resolve, reject) => {
        Axios.get(path.getHistoryList, {params})
          .then(res => {
            resolve(res)
          })
          .catch(err => {
            reject()
          })
      })
    },
    getBasketballHistory ({commit}, params) {
      return new Promise((resolve, reject) => {
        Axios.get(path.getBasketballList, {params})
          .then(res => {
            if (res.event) {
              let arr = res.event.map(obj => formatData(obj));
              resolve({...res, event: arr})
            }
          })
          .catch(err => {
            reject()
          })
      })
    }
  }
});
