import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  state: {
    orderInfo: null,

    orderLoading: false,
    orderLoadingFailed: false,
  },
  mutations: {
    updateOrderInfo(state, orderInfo) {
      state.orderInfo = orderInfo;
    },
    orderLoadingChecking(state, flag) {
      state.orderLoading = flag;
    },
    orderLoadingFailedChecking(state, flag) {
      state.orderLoadingFailed = flag;
    },
  },
  actions: {
    async loadOrderInfo(context, orderId) {
      context.commit('orderLoadingChecking', true);
      context.commit('orderLoadingFailedChecking', false);
      try {
        await new Promise((resolve) => setTimeout(resolve, 0));
        const response = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
          params: {
            userAccessKey: context.rootState.user.userAccessKey,
          },
        });
        context.commit('updateOrderInfo', response.data);
      } catch {
        context.commit('orderLoadingFailedChecking', true);
      }
      context.commit('orderLoadingChecking', false);
    },
  },
};
