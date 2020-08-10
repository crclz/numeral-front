import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import CreateFile from "../components/CreateFile";
import EditFile from "../components/EditFile";
import MyFiles from "../components/MyFiles"

Vue.use(VueRouter)

const routes = [
    {
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
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/createFile',
        name: 'CreateFile',
        component: CreateFile
    },
    {
        path: '/editFile',
        name: 'EditFile',
        component: EditFile
    },
    {
        path: '/myFiles',
        name: 'MyFiles',
        component: MyFiles
    },
]

const router = new VueRouter({
    routes
})

export default router
