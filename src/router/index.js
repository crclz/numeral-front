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
import PatchUser from '../views/PatchUser.vue';

import Register from "../views/Register";

import MyCreatedTeams from "../views/MyCreatedTeams";
import HelloWorld from "../components/HelloWorld";

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: { path: '/welcome' }
    },
    {
        path: '/workspace',
        name: 'workspace',
        component: Home,
        children: [{
                path: '',
                redirect: { path: 'myfiles' },
                meta: {
                    title: '我的文档_numeral'
                }
            },
            {
                path: 'recentfiles',
                component: RecentFiles,
                meta: {
                    title: '最近文档_numeral'
                }
            },
            {
                path: 'myfiles',
                component: MyFiles,
                meta: {
                    title: '我的文档_numeral'
                }
            },
            {
                path: 'favorite',
                component: FavoriteFiles,
                meta: {
                    title: '收藏文档_numeral'
                }
            },
            {
                path: 'my-teams',
                component: MyTeams,
                meta: {
                    title: '我加入的团队_numeral'
                }
            },
            {
                path: 'trash',
                component: RecycleFiles,
                meta: {
                    title: '回收站_numeral'
                }
            },
            {
                path: 'my-created-teams',
                component: MyCreatedTeams,
                meta: {
                    title: '我创建的团队_numeral'
                }
            },
        ]
    },
    {
        path: '/welcome',
        name: 'Welcome',
        component: HelloWorld,
        meta: {
            title: '首页_numeral'
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: {
            title: '登录_numeral'
        }
    },
    {
        path: '/recentfiles',
        name: 'RecentFiles',
        component: RecentFiles,
        meta: {
            title: '最近文档_numeral'
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
        meta: {
            title: '注册_numeral'
        }
    },
    {
        path: '/setdocpermission/:id',
        name: 'SetDocPermission',
        component: SetDocPermission,
    },
    {
        path: '/getuser/:id',
        name: 'GetUser',
        component: GetUser,
        meta: {
            title: '个人信息_numeral'
        }
    },
    {
        path: '/patchUser/:id',
        name: 'PatchUser',
        component: PatchUser,
        meta: {
            title: '修改个人信息_numeral'
        }
    },

    {
        path: '/createFile',
        name: 'CreateFile',
        component: CreateFile,
        meta: {
            title: '创建文档_numeral'
        }
    },
    {
        path: '/createFile/:id',
        name: 'CreateFromTemplate',
        component: CreateFile,
        meta: {
            title: '创建文档_numeral'
        }
    },
    {
        path: '/editFile/:id',
        name: 'EditFile',
        component: EditFile,
        meta: {
            title: '编辑文档_numeral'
        }
    },
    {
        path: '/myFiles',
        name: 'MyFiles',
        component: MyFiles,
        meta: {
            title: '我的文档_numeral'
        }
    },
    {
        path: '/favoriteFiles',
        name: 'FavoriteFiles',
        component: FavoriteFiles,
        meta: {
            title: '收藏文档_numeral'
        }
    },
    {
        path: '/recycleFiles',
        name: 'RecycleFiles',
        component: RecycleFiles,
        meta: {
            title: '回收站_numeral'
        }
    },
    {
        path: '/readFile/:id',
        name: 'ReadFile',
        component: ReadFile,
        meta: {
            title: '查看文档_numeral'
        }
    },
    // {
    //     path: '/createFromTemplate/:id',
    //     name: 'CreateFromTemplate',
    //     component: CreateFromTemplate
    // },
    {
        path: '/createTeam',
        name: 'CreateTeam',
        component: CreateTeam,
        meta: {
            title: '创建团队_numeral'
        }
    },
    {
        path: '/myTeams',
        name: 'MyTeams',
        component: MyTeams,
        meta: {
            title: '我加入的团队_numeral'
        }
    },
    {
        path: '/mycreatedteams',
        name: 'MyCreatedTeams',
        component: MyCreatedTeams,
        meta: {
            title: '我创建的团队_numeral'
        }
    },
    {
        path: '/team/:id',
        name: 'Team',
        component: Team,
        meta: {
            title: '团队主页_numeral'
        }
    },
    // {
    //     path: '/manageApplications/:id',
    //     name: 'ManageApplications',
    //     component: ManageApplications
    // },
    {
        path: '/team-manage/:id',
        name: 'TeamManage',
        meta: {
            title: '团队管理_numeral'
        },
        component: () =>
            import ('../views/TeamManage.vue')
    },
    {
        path: '/team-files/:id',
        name: 'TeamFiles',
        meta: {
            title: '团队文档_numeral'
        },
        component: () =>
            import ('../components/TeamFiles.vue')
    },

]

const router = new VueRouter({
    routes
})

export default router