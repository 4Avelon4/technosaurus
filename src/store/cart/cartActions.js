import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  async loadCart(context) {
    context.commit('cartLoadingChecking', true);
    context.commit('cartLoadingFailedChecking', false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const response = await axios.get(`${API_BASE_URL}/api/baskets`, {
        params: {
          userAccessKey: context.rootState.user.userAccessKey,
        },
      });
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

    this.loadProductsTimer = setTimeout(() => {
      axios
        .post(
          `${API_BASE_URL}/api/baskets/products`,
          {
            productId,
            quantity: amount,
          },
          {
            params: {
              userAccessKey: context.state.userAccessKey,
            },
          }
        )
        .then((response) => {
          context.commit('updateCartProductsData', response.data.items);
          context.commit('syncCartProducts');
          context.commit('productAddedChecking', true);
          context.commit('productAddSendingChecking', false);
        });
    }, 0);
  },
  updateCartProductAmount(context, { productId, amount }) {
    context.commit('updateCartProductAmount', { productId, amount });

    if (amount < 1) {
      return;
    }

    if (typeof amount !== 'number') {
      return;
    }
    axios
      .put(
        `${API_BASE_URL}/api/baskets/products`,
        {
          productId,
          quantity: amount,
        },
        {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        }
      )
      .then((response) => {
        context.commit('updateCartProductsData', response.data.items);
      })
      .catch(() => {
        context.commit('syncCartProducts');
      });
  },
  async removeCartFromProduct(context, { productId }) {
    context.commit('cartLoadingChecking', true);
    context.commit('cartLoadingFailedChecking', false);

    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const response = await axios.delete(`${API_BASE_URL}/api/baskets/products`, {
        data: {
          productId,
        },
        params: {
          userAccessKey: context.state.userAccessKey,
        },
      });
      context.commit('updateCartProductsData', response.data.items);
      context.commit('syncCartProducts');
    } catch {
      context.commit('cartLoadingFailedChecking', true);
    }
    context.commit('cartLoadingChecking', false);
  },
};
