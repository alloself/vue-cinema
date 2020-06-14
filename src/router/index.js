import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'VideoList',
    component: () => import('@/views/VideoList.vue'),
  },
  {
    path: '/:id',
    name: 'VideoDetail',
    component: () => import('@/views/VideoDetail.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
