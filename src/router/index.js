import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue';
import GetUser from '../views/GetUser.vue';
import CreateFile from "../views/CreateFile";
import EditFile from "../views/EditFile";
import MyFiles from "../views/MyFiles";
import Login from '../views/Login.vue'
import ReadFile from "../views/ReadFile";
// import CreateFromTemplate from "../views/CreateFromTemplate";
import FavoriteFiles from "../views/FavoriteFiles";
import RecycleFiles from "../views/RecycleFiles";
import RecentFiles from "../views/RecentFiles";
import CreateTeam from "../views/CreateTeam";
import MyTeams from "../views/MyTeams";
import SetDocPermission from "../components/SetDocPermission";
import Team from "../views/Team";
// import ManageApplications from "../components/ManageApplications";
import PatchUser from '../views/PatchUser.vue';
import Register from "../views/Register";

import MyCreatedTeams from "../views/MyCreatedTeams";
import HelloWorld from "../views/HelloWorld";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: { path: '/welcome' }
    },
    {
        path: '/workspace',
        name: 'workspace',
        component: Home,
        children: [
            { path: '', redirect: { path: 'myfiles' } },
            { path: 'recentfiles', component: RecentFiles },
            { path: 'myfiles', component: MyFiles },
            { path: 'favorite', component: FavoriteFiles },
            { path: 'my-teams', component: MyTeams },
            { path: 'trash', component: RecycleFiles },
            { path: 'my-created-teams', component: MyCreatedTeams },
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/recentfiles',
        name: 'RecentFiles',
        component: RecentFiles
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/setdocpermission/:id',
        name: 'SetDocPermission',
        component: SetDocPermission
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
        path: '/createFile/:id',
        name: 'CreateFromTemplate',
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
    // {
    //     path: '/createFromTemplate/:id',
    //     name: 'CreateFromTemplate',
    //     component: CreateFromTemplate
    // },
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
    {
        path: '/mycreatedteams',
        name: 'MyCreatedTeams',
        component: MyCreatedTeams
    },
    {
        path: '/team/:id',
        name: 'Team',
        component: Team
    },
    // {
    //     path: '/manageApplications/:id',
    //     name: 'ManageApplications',
    //     component: ManageApplications
    // },
    {
        path: '/team-manage/:id',
        name: 'TeamManage',
        component: () =>
            import('../views/TeamManage.vue')
    },
    {
        path: '/team-files/:id',
        name: 'TeamFiles',
        component: () =>
            import('../views/TeamFiles.vue')
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: HelloWorld,
    }
]

const router = new VueRouter({
    routes
})

export default router