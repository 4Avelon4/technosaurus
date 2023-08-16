import axios from 'axios';
import { API_BASE_URL } from '@/config';

export default {
  async loadProducts(context, { filterParams, productsPerPage }) {
    context.commit('productLoadingChecking', true);
    context.commit('productLoadingFailedChecking', false);

    context.commit('resetProductsData');

    this.loadProductsTimer = setTimeout(() => {
      axios
        .get(`${API_BASE_URL}/api/products`, {
          params: {
            page: filterParams.page,
            limit: productsPerPage,
            categoryId: filterParams.categoryId,
            colorId: filterParams.colorId,
            minPrice: filterParams.priceFrom,
            maxPrice: filterParams.priceTo,
          },
        })
        .then((response) => {
          context.commit('updateProductsData', response.data);
        })
        .catch(() => {
          context.commit('productLoadingFailedChecking', true);
        })
        .then(() => {
          context.commit('productLoadingChecking', false);
        });
    }, 0);
  },
  async loadProduct(context, { id }) {
    context.commit('productLoadingChecking', true);
    context.commit('productLoadingFailedChecking', false);

    context.commit('resetProductsData');

    this.loadProductsTimer = setTimeout(() => {
      axios
        .get(`${API_BASE_URL}/api/products/${id}`)
        .then((response) => {
          context.commit('updateProductsData', response.data);
        })
        .catch(() => {
          context.commit('productLoadingFailedChecking', true);
        })
        .then(() => {
          context.commit('productLoadingChecking', false);
        });
    }, 0);
  },
};
