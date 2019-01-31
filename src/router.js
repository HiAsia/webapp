import Vue from "vue";
import Router from "vue-router";
import Home from "./pages/Home.vue";
import Score from './pages/Score'
import Events from './pages/Events'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/score",
      name: "score",
      component: Score
    },
    {
      path: "/events",
      name: "events",
      component: Events
    }
  ]
});
