export default {
  updateUserAccessKey(state, accessKey) {
    state.userAccessKey = accessKey;
  },
  resetCart(state) {
    state.cartProducts = [];
    state.cartProductsData = [];
  },
  updateCartProductAmount(state, { productId, amount }) {
    const item = state.cartProducts.find((item) => item.productId === productId);

    if (item) {
      item.amount = amount;
    }
  },
  updateCartProductsData(state, items) {
    state.cartProductsData = items;
  },
  syncCartProducts(state) {
    state.cartProducts = state.cartProductsData.map((item) => ({
      productId: item.product.id,
      amount: item.quantity,
    }));
  },
  cartLoadingChecking(state, flag) {
    state.cartLoading = flag;
  },
  cartLoadingFailedChecking(state, flag) {
    state.cartLoadingFailed = flag;
  },
};
