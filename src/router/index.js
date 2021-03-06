import Vue from 'vue'

import  VueRouter from 'vue-router'

import Login from "../views/admin/Login"
import BIndex from "../views/admin/Index"
import User from "../views/admin/user/Index"
import Info from "../views/admin/user/Info"

import Article from "../views/admin/article/Index"
import ArticleAdd from '../views/admin/article/Add'
import ArticleEdit from '../views/admin/article/Edit'

import Channel from "../views/admin/channel/Index"
import Channel_add from "../views/admin/channel/Add"
import Channel_edit from "../views/admin/channel/Edit"

import FriendLink from "../views/admin/friendlink/Index"
import FriendLinkAdd from "../views/admin/friendlink/Add"
import FriendLinkEdit from "../views/admin/friendlink/Edit"

import Tag from "../views/admin/tag/Index"

import Comment from "../views/admin/comment/Index"
import Check from "../views/admin/comment/Check"

import FIndex from '../views/front/Index'
import List from '../views/front/List'
import Detail from '../views/front/Detail'
import ChannelDetail from '../views/front/ChannelDetail'
import TagList from '../views/front/TagList'

import token from '../store/token'

Vue.use(VueRouter)

const router = new VueRouter({
    // mode: 'history',
    routes:[
        {
            path: '/',
            name: 'Index',
            component: FIndex,
            meta: {
                requireLogin: false
            }
        },
        {
            path: '/content',
            name: 'fIndex',
            component: FIndex,
            meta: {
                requireLogin: false
            }
        },
        {
            path: '/list/:id',
            name: 'List',
            component: List,
            meta: {
                requireLogin: false
            }
        },
        {
            path: '/detail/:id',
            name: 'Detail',
            component: Detail,
            meta: {
                requireLogin: false
            }
        },
        {
            path: '/channel_detail/:id',
            name: 'channel_detail',
            component: ChannelDetail,
            meta: {
                requireLogin: false
            }
        },
        {
            path: '/tag_list/:id',
            name: 'tag_list',
            component: TagList,
            meta: {
                requireLogin: false
            }
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        },
        {
            path: '/index',
            name: 'index',
            component: BIndex,
            children: [
                {
                    path: '/user',
                    name: 'User',
                    component: User
                },
                {
                    path: '/info',
                    name: 'info',
                    component: Info
                },
                {
                    path: '/channel',
                    name: 'channel',
                    component: Channel
                },
                {
                    path: '/channel_add',
                    name: 'channel_add',
                    component: Channel_add
                },
                {
                    path: '/channel_edit',
                    name: 'channel_edit',
                    component: Channel_edit
                },
                {
                    path: '/tag',
                    name: 'tag',
                    component: Tag
                },
                {
                    path: '/friend',
                    name:'friend',
                    component: FriendLink
                },
                {
                    path: '/friend_add',
                    name: 'friend_add',
                    component: FriendLinkAdd
                },
                {
                    path: '/friend_edit',
                    name: 'friend_edit',
                    component: FriendLinkEdit
                },
                {
                    path: '/article',
                    name: 'article',
                    component: Article
                },
                {
                    path: '/article_add',
                    name: 'article_add',
                    component: ArticleAdd
                },
                {
                    path: '/article_edit',
                    name: 'article_edit',
                    component: ArticleEdit
                },
                {
                    path: '/comment',
                    name: 'comment',
                    component: Comment
                },
                {
                    path: '/comment_check',
                    name: 'comment_check',
                    component: Check
                }
            ]
        }
    ]
})


router.beforeEach((to, from, next) => {
    if(!to.matched.some(r => r.meta.requireLogin)) {
        next()
    }else {
        if(token.get()) {
            next()
        }else {
            if (to.path == '/login') {
                next()
            } else {
                next('/login')
            }
        }
    }
})

export default  router