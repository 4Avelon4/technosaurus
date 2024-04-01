import { cartRequest, addProduct, updateCart, removeCart } from '@/api/cart';

export default {
  async loadCart(context) {
    context.commit('cartLoadingChecking', true);
    context.commit('cartLoadingFailedChecking', false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const response = await cartRequest(context.rootState.user.userAccessKey);
      if (!context.rootState.user.userAccessKey) {
        localStorage.setItem('userAccessKey', response.data.user.accessKey);
        context.commit('updateUserAccessKey', response.data.user.accessKey, { root: true });
      }

      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    } catch {
      context.commit('cartLoadingFailedChecking', true);
    }
    context.commit('cartLoadingChecking', false);
  },
  async addProductToCart(context, { productId, amount }) {
    context.commit('productAddedChecking', false);
    context.commit('productAddSendingChecking', true);

    const response = await addProduct(context.rootState.user.userAccessKey, { productId, amount });

    context.commit('updateCartProductsData', response.data.items);
    context.commit('syncCartProducts');
    context.commit('productAddedChecking', true);
    context.commit('productAddSendingChecking', false);
  },
  async updateCartProductAmount(context, { productId, amount }) {
    context.commit('updateCartProductAmount', { productId, amount });

    if (amount < 1) {
      return;
    }

    if (typeof amount !== 'number') {
      return;
    }

    try {
      const response = await updateCart(context.rootState.user.userAccessKey, { productId, amount });

      context.commit('updateCartProductsData', response.data.items);
    } catch {
      context.commit('syncCartProducts');
    }
  },
  async removeCartFromProduct(context, { productId }) {
    context.commit('cartLoadingChecking', true);
    context.commit('cartLoadingFailedChecking', false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 0));

      const response = await removeCart(context.rootState.user.userAccessKey, { productId });

      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    } catch {
      context.commit('cartLoadingFailedChecking', true);
    }
    context.commit('cartLoadingChecking', false);
  },
};
