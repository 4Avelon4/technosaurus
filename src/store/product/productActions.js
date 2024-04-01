import { productsRequest, productRequest } from '@/api/product';

export default {
  async loadProducts(context, { filterParams, productsPerPage }) {
    context.commit('productLoadingChecking', true);
    context.commit('productLoadingFailedChecking', false);

    context.commit('resetProductsData');

    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const response = await productsRequest(
        filterParams.page,
        productsPerPage,
        filterParams.categoryId,
        filterParams.colorId,
        filterParams.priceFrom,
        filterParams.priceTo
      );

      context.commit('updateProductsData', response.data);
    } catch {
      context.commit('productLoadingFailedChecking', true);
    }
    context.commit('productLoadingChecking', false);
  },
  async loadProduct(context, { id }) {
    context.commit('productLoadingChecking', true);
    context.commit('productLoadingFailedChecking', false);

    context.commit('resetProductsData');

    try {
      await new Promise((resolve) => setTimeout(resolve, 0));
      const response = await productRequest(id);

      context.commit('updateProductsData', response.data);
    } catch {
      context.commit('productLoadingFailedChecking', true);
    }
    context.commit('productLoadingChecking', false);
  },
};
