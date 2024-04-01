import { orderInfoRequest, orderRequest } from '@/api/order';

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
    updateFormError(state, error) {
      state.formError = error;
    },
    updateFormErrorMessage(state, errorMessage) {
      state.formErrorMessage = errorMessage;
    },
  },
  actions: {
    async loadOrderInfo(context, orderId) {
      context.commit('orderLoadingChecking', true);
      context.commit('orderLoadingFailedChecking', false);
      try {
        await new Promise((resolve) => setTimeout(resolve, 0));
        const response = await orderInfoRequest(context.rootState.user.userAccessKey, orderId);

        context.commit('updateOrderInfo', response.data);
      } catch {
        context.commit('orderLoadingFailedChecking', true);
      }
      context.commit('orderLoadingChecking', false);
    },
  },
};
