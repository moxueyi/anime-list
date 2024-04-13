
import { RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'found',
        component: () => import('../views/found'),
    }, {
        path: '/channel',
        name: 'channel',
        component: () => import('../views/channel'),
        children: [
            {
                path: '/channel/:style',
                name: 'channelDetial',
                component: () => import('../views/channel/channelDetial.vue'),
            }
        ]
    }, {
        path: '/my',
        name: 'my',
        component: () => import('../views/my'),
    }, {
        path: '/detial',
        name: 'detial',
        component: () => import('../views/detial'),
    }, {
        path: '/search/:category',
        name: 'search',
        component: () => import('../views/search'),
    }, {
        path: '/search/keyword/:keyword',
        name: 'searchKeyword',
        component: () => import('../views/search'),
    }
];

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
})

const setupRouter = (app: any) => {
    app.use(router);
}

export default setupRouter;
