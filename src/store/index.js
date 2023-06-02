import Vue from 'vue';
import Vuex from 'vuex';
import user from './user/user';
import product from './product/product';
import cart from './cart/cart';
import order from './order/order';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    product,
    cart,
    order,
  },
});
