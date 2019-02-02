let base = process.env.VUE_APP_HOST;
export default {
  "getSoccerList": base + "/soccer/match/list",
  "getSoccerScoreRank": base + "/soccer/league/scoreRank",
  "getSoccerLiveList": base + "/soccer/match/recent10",
  "getSoccerHot": base + "/soccer/league/hot5",
  "getSoccerShooterRank": base + "/soccer/league/shooterRank",
  "getBasketballList": base + "/basketball/event/list",
  "getBasketballRecent": base + "/basketball/event/recent",
  "getCountryList": base + "/soccer/league/countryGroup",
  "getHistoryList": base + "/soccer/match/past"
}
