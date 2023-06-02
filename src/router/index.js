import Vue from 'vue';
import VueRouter from 'vue-router';
import PageMain from '@/pages/PageMain.vue';
import PageProduct from '@/pages/PageProduct.vue';
import PageCart from '@/pages/PageCart.vue';
import PageNotFound from '@/pages/PageNotFound.vue';
import PageOrder from '@/pages/PageOrder.vue';
import PageOrderInfo from '@/pages/PageOrderInfo.vue';

Vue.use(VueRouter);

const routes = [
  {
    name: 'main',
    component: PageMain,
    path: '',
  },
  {
    name: 'product',
    component: PageProduct,
    path: '/product/:id',
  },
  {
    name: 'cart',
    component: PageCart,
    path: '/cart',
  },
  {
    name: 'order',
    component: PageOrder,
    path: '/order',
  },
  {
    name: 'orderInfo',
    component: PageOrderInfo,
    path: '/order/:id',
  },
  {
    name: 'notFound',
    component: PageNotFound,
    path: '*',
  },
];

const router = new VueRouter({
  // mode: 'history',
  routes,
});

export default router;
