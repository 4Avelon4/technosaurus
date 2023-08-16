export default {
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
  updateProductsData(state, data) {
    state.productsData = data;
  },
  resetProductsData(state) {
    state.productsData = null;
  },
};
