import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue';
import GetUser from '../views/GetUser.vue';
import CreateFile from "../views/CreateFile";
import EditFile from "../views/EditFile";
import MyFiles from "../views/MyFiles";
import Login from '../views/Login.vue'
import ReadFile from "../views/ReadFile";
import CreateFromTemplate from "../views/CreateFromTemplate";
import FavoriteFiles from "../views/FavoriteFiles";
import RecycleFiles from "../views/RecycleFiles";
import CreateTeam from "../views/CreateTeam";
import MyTeams from "../views/MyTeams";

import Logout from '../components/Logout.vue'
import PatchUser from '../views/PatchUser.vue'

Vue.use(VueRouter)
    // asdsadsadsa
const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/logout',
        name: 'Logout',
        component: Logout
    },
    {
        path: '/getuser/:id',
        name: 'GetUser',
        component: GetUser
    },
    {
        path: '/patchUser/:id',
        name: 'PatchUser',
        component: PatchUser
    },
    {
        path: '/createFile',
        name: 'CreateFile',
        component: CreateFile
    },
    {
        path: '/editFile/:id',
        name: 'EditFile',
        component: EditFile
    },
    {
        path: '/myFiles',
        name: 'MyFiles',
        component: MyFiles
    },
    {
        path: '/favoriteFiles',
        name: 'FavoriteFiles',
        component: FavoriteFiles
    },
    {
        path: '/recycleFiles',
        name: 'RecycleFiles',
        component: RecycleFiles
    },
    {
        path: '/readFile/:id',
        name: 'ReadFile',
        component: ReadFile
    },
    {
        path: '/createFromTemplate/:id',
        name: 'CreateFromTemplate',
        component: CreateFromTemplate
    },
    {
        path: '/createTeam',
        name: 'CreateTeam',
        component: CreateTeam
    },
    {
        path: '/myTeams',
        name: 'MyTeams',
        component: MyTeams
    },
]

const router = new VueRouter({
    routes
})

export default router