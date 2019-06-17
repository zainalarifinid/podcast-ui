import Vue from "vue";
import Router from "vue-router";
import Home from "./app/pages/Home";
import Feed from "./app/pages/Feed";
// import auth from "./app/services/authService";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/feed",
            name: "feed",
            component: Feed
        }
    ]
});

// router.beforeEach((to, from, next) => {
//     if (to.path === "/" || to.path === "/callback" || auth.isAuthenticated()) {
//       return next();
//     }
  
//     auth.login({ target: to.path });
// });
  
export default router;
