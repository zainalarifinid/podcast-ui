import Vue from "vue";
import Router from "vue-router";
import Home from "./app/pages/Home";
import Feed from "./app/pages/Feed";
import PodcastEditor from "./app/pages/PodcastEditor";
import Login from "./app/pages/Login";
import Profile from "./app/pages/Profile";
import Explorer from "./app/pages/Explorer";

Vue.use(Router);

const router = new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "HomePage",
            component: Home
        },
        {
            path: "/feed",
            name: "feed",
            component: Feed
        },
        {
            path: "/podcast-editor",
            name: "PodcastEditor",
            component: PodcastEditor
        },
        {
            path: "/detail-podcast",
            name: "DetailPodcast",
            
        },
        {
            path: "/login",
            name: "LoginPage",
            component: Login
        },
        {
            path: "/profile/:username",
            name: "ProfilePage",
            component: Profile,
            props: true
        },
        {
            path: "/explorer",
            name: "ExplorerPage",
            component: Explorer
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
