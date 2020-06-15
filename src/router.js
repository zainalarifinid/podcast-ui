import Vue from "vue";
import Router from "vue-router";
import Home from "./app/pages/Home";
import Feed from "./app/pages/Feed";
import PodcastEditor from "./app/pages/PodcastEditor";
import Login from "./app/pages/Login";
import Profile from "./app/pages/Profile";
import Explorer from "./app/pages/Explorer";
import PlaylistEditor from "./app/pages/PlaylistEditor";
import DetailPodcast from "./app/pages/DetailPodcast";
import DetailPlaylist from "./app/pages/DetailPlaylist";
import ListPeople from "./app/pages/ListPeople";
import EditProfile from "./app/pages/EditProfile";

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
            path: "/detail-podcast/:username/:idPodcast",
            name: "DetailPodcast",
            component: DetailPodcast,
            props: true
            
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
        },
        {
            path: "/playlist-editor/:username",
            name: "PlaylistEditor",
            component: PlaylistEditor,
            props: true
        },
        {
            path: "/playlist-editor/edit/:username/:idPlaylist/:title",
            name: "EditPlaylist",
            component: PlaylistEditor,
            props: true
        },
        {
            path: "/playlist-detail/:idPlaylist/:username",
            name: "DetailPlaylist",
            component: DetailPlaylist,
            props: true
        },
        {
            path: "/detail/:type/:username",
            name: "ListPeople",
            component: ListPeople,
            props: true
        },
        {
            path: "/podcast/edit/:idPodcast",
            name: "EditPodcast",
            component: PodcastEditor,
            props: true
        },
        {
            path: "/profile/edit/:username",
            name: "EditProfile",
            component: EditProfile,
            props: (route) => ({
                ...route.params
            })
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
