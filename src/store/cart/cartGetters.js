export default {
  cartDetailProducts(state) {
    return state.cartProducts.map((item) => {
      const product = state.cartProductsData.find((p) => p.product.id === item.productId).product;

      return {
        ...item,
        product: {
          ...product,
          image: product.image.file.url,
        },
      };
    });
  },
  cartTotalPrice(state, getters) {
    return getters.cartDetailProducts.reduce((acc, item) => item.product.price * item.amount + acc, 0);
  },
  cartProductsCount(state) {
    return state.cartProducts.reduce((acc, item) => item.amount + acc, 0);
  },
};
