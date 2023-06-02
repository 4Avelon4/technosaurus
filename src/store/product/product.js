export default {
  state: {
    productsLoading: false,
    productsLoadingFailed: false,

    productAdded: false,
    productAddSending: false,
  },
  mutations: {
    productLoadingChecking(state, flag) {
      state.productsLoading = flag;
    },
    productLoadingFailedChecking(state, flag) {
      state.productsLoadingFailed = flag;
    },
    productAddedChecking(state, flag) {
      state.productAdded = flag;
    },
    productAddSendingChecking(state, flag) {
      state.productAddSending = flag;
    },
  },
};
